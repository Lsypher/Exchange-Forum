package controllers

import (
	"encoding/json"
	"errors"
	"exchangeapp/global"
	"exchangeapp/models"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"gorm.io/gorm"
)

// 定义一个缓存键，用于存储文章列表的缓存数据
var cachekey = "articles_cache"

// 创建文章函数，接收一个 Gin 上下文对象作为参数，处理创建文章的 HTTP 请求
func CreateArticle(ctx *gin.Context) {
	// 定义一个 Article 结构体变量 article，用于接收请求中的 JSON 数据并进行绑定
	var article models.Article // 单个文章对象，接收客户端传来的单个文章数据

	// 使用 ShouldBindJSON 方法将请求中的 JSON 数据绑定到 article 变量上，如果绑定失败，返回一个 HTTP 400 错误响应，包含错误信息
	if err := ctx.ShouldBindJSON(&article); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// // 使用 AutoMigrate 方法进行自动迁移，确保数据库中存在与 Article 结构体对应的表，如果迁移失败，返回一个 HTTP 500 错误响应，包含错误信息
	// if err := global.Db.AutoMigrate(&article); err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	// 	return
	// }

	// 使用 Create 方法将 article 变量中的数据插入数据库的 articles 表中，如果插入失败，返回一个 HTTP 500 错误响应，包含错误信息
	if err := global.Db.Create(&article).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 使用 Del 方法删除 Redis 中与 cachekey 相关的缓存数据，如果删除失败，返回一个 HTTP 500 错误响应，包含错误信息
	// 文章创建成功后，删除 Redis 中与 cachekey 相关的缓存数据，以确保下次获取文章列表时能够获取到最新的数据，旁路缓存机制，保证数据的一致性和实时性
	if err := global.RedisDB.Del(cachekey).Err(); err != nil {
		log.Printf("Failed to delete cache key %s: %v", cachekey, err)

		// 异步重试删除
		go func() {
			maxRetries := 3
			for i := 0; i < maxRetries; i++ {
				time.Sleep(time.Duration(i+1) * time.Second) // 等待一段时间后重试
				if err := global.RedisDB.Del(cachekey).Err(); err == nil {
					log.Printf("Successfully deleted cache key %s on retry %d", cachekey, i+1)
					break
				} else {
					log.Printf("Retry %d: Failed to delete cache key %s: %v", i+1, cachekey, err)
				}
			}
		}()
	}

	// 返回一个 HTTP 200 成功响应，包含创建成功的文章数据
	ctx.JSON(http.StatusOK, article)
}

// 获取文章列表函数，接收一个 Gin 上下文对象作为参数，处理获取文章列表的 HTTP 请求
func GetArticles(ctx *gin.Context) {

	// 使用 Get 方法从 Redis 中获取与 cachekey 相关的缓存数据，将结果存储在 cachedData 变量中，如果获取失败
	cachedData, err := global.RedisDB.Get(cachekey).Result()
	// 如果获取失败，且错误类型是 redis.Nil，表示缓存中没有数据，此时需要从数据库中查询文章列表，并将结果存储到 Redis 中，以便下次获取时能够直接从缓存中获取数据，提高性能和响应速度
	if err == redis.Nil {
		// 定义一个 Article 结构体切片变量 articles，用于存储从数据库中的 articles 表查询到的文章列表
		var articles []models.Article

		// 使用 Find 方法从数据库中查询 articles 表的所有记录，并将结果存储在 articles 变量中，如果查询失败，返回一个 HTTP 404 错误响应（如果错误类型是 gorm.ErrRecordNotFound）或者 HTTP 500 错误响应（其他错误），包含错误信息
		// .Error 只返回错误信息，忽略其他信息
		if err := global.Db.Find(&articles).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			} else {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			}
			return
		}

		// 若查询成功，将 articles 变量中的数据转换为 JSON 格式，并存储在 articlesJSON 变量中，如果转换失败，返回一个 HTTP 500 错误响应，包含错误信息
		articlesJSON, err := json.Marshal(articles)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// 使用 Set 方法将 articlesJSON 变量中的数据存储到 Redis 中，键为 cachekey，过期时间为 10 分钟，如果存储失败，返回一个 HTTP 500 错误响应，包含错误信息
		if err := global.RedisDB.Set(cachekey, articlesJSON, 10*time.Minute).Err(); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// 返回一个 HTTP 200 成功响应，包含从数据库中查询到的文章列表数据
		ctx.JSON(http.StatusOK, articles)

	} else if err != nil { // 如果获取缓存数据失败，且错误类型不是 redis.Nil，表示发生了其他错误，此时返回一个 HTTP 500 错误响应，包含错误信息
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else { // 如果获取成功，表示缓存中有数据，此时需要将缓存中的 JSON 数据转换为 Article 结构体切片，并返回给客户端
		var articles []models.Article

		// 使用 json.Unmarshal 方法将 cachedData 变量中的 JSON 数据转换为 Article 结构体切片，并存储在 articles 变量中，如果转换失败，返回一个 HTTP 500 错误响应，包含错误信息
		if err := json.Unmarshal([]byte(cachedData), &articles); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, articles)
	}
}

// 根据文章 ID 获取文章函数，接收一个 Gin 上下文对象作为参数，处理根据文章 ID 获取文章的 HTTP 请求
func GetArticleByID(ctx *gin.Context) {

	// 从请求的 URL 参数中获取文章 ID，并存储在 id 变量中
	// .Param() 方法用于获取 URL 参数，参数名称为 "id"，返回值是一个字符串类型的 ID
	id := ctx.Param("id")

	// 定义一个 Article 结构体变量 article，用于存储从数据库中的 articles 表查询到的文章数据
	var article models.Article

	// 使用 Where 方法查询数据库中 articles 表中 ID 字段等于 id 变量的记录，并将结果存储在 article 变量中，如果查询失败，返回一个 HTTP 404 错误响应（如果错误类型是 gorm.ErrRecordNotFound）或者 HTTP 500 错误响应（其他错误），包含错误信息
	if err := global.Db.Where("id = ?", id).First(&article).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	ctx.JSON(http.StatusOK, article)
}
