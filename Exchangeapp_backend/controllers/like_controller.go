package controllers

import (
	"exchangeapp/global"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 点赞文章函数，接受一个 Gin 上下文对象作为参数，处理点赞文章的 HTTP 请求，首先从请求路径中获取文章 ID，然后构造一个 Redis 键，用于存储该文章的点赞数，接着使用 Incr 方法将该键对应的值加 1，如果操作失败，返回一个 HTTP 500 错误响应，包含错误信息，如果操作成功，则返回一个 HTTP 200 成功响应，包含一条消息 "Article liked successfully"
func LikeArticle(ctx *gin.Context) {

	// 从 URL 路径中获取文章 ID，存储在 articleID 变量中
	articleID := ctx.Param("id")

	// 构造一个 Redis 键，用于存储该文章的点赞数，键的格式为 "article:{articleID}:likes"，其中 {articleID} 是从 URL 路径中获取的文章 ID
	likeKey := "article:" + articleID + ":likes"

	// 使用 Incr 方法将 likeKey 对应的值加 1，如果操作失败，返回一个 HTTP 500 错误响应，包含错误信息
	if err := global.RedisDB.Incr(likeKey).Err(); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 获取更新后的点赞数
	likes, err := global.RedisDB.Get(likeKey).Result()
	if err != nil {
		likes = "1"
	}

	// 返回一个 HTTP 200 成功响应，包含一条消息和当前点赞数
	ctx.JSON(http.StatusOK, gin.H{
		"message": "Article liked successfully",
		"likes":   likes,
	})
}

// 获取文章点赞数函数，接受一个 Gin 上下文对象作为参数，处理获取文章点赞数的 HTTP 请求，首先从请求路径中获取文章 ID，然后构造一个 Redis 键，用于存储该文章的点赞数，接着使用 Get 方法从 Redis 中获取该键对应的值，如果获取失败且错误类型是 redis.Nil，表示该键不存在，此时将点赞数设置为 "0"，如果获取失败但错误类型不是 redis.Nil，表示获取过程中发生了其他错误，此时返回一个 HTTP 500 错误响应，包含错误信息，如果获取成功，则返回一个 HTTP 200 成功响应，包含一个 JSON 对象，其中 "likes" 字段的值为获取到的点赞数
func GetArticleLikes(ctx *gin.Context) {
	// 从 URL 路径中获取文章 ID，存储在 articleID 变量中
	articleID := ctx.Param("id")

	// 构造一个 Redis 键，用于存储该文章的点赞数，键的格式为 "article:{articleID}:likes"，其中 {articleID} 是从 URL 路径中获取的文章 ID
	likeKey := "article:" + articleID + ":likes"

	// 使用 Get 方法从 Redis 中获取 likeKey 对应的值，如果获取失败且错误类型是 redis.Nil，表示该键不存在，此时将点赞数设置为 "0"，如果获取失败但错误类型不是 redis.Nil，表示获取过程中发生了其他错误，此时返回一个 HTTP 500 错误响应，包含错误信息，如果获取成功，则返回一个 HTTP 200 成功响应，包含一个 JSON 对象，其中 "likes" 字段的值为获取到的点赞数
	likes, err := global.RedisDB.Get(likeKey).Result()
	if err != nil {
		if err.Error() == "redis: nil" {
			likes = "0"
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	// 返回一个 HTTP 200 成功响应，包含一个 JSON 对象，其中 "likes" 字段的值为获取到的点赞数
	ctx.JSON(http.StatusOK, gin.H{"likes": likes})
}
