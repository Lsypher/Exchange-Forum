package router

import (
	"exchangeapp/controllers"
	"exchangeapp/middlewares"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	// 创建一个默认的 Gin 引擎实例
	r := gin.Default()

	// 配置 CORS 中间件，连接前后端，允许跨域请求
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},                   // 允许来自 http://localhost:5173 的请求
		AllowMethods:     []string{"GET", "POST", "PUT", "OPTIONS"},           // 允许的 HTTP 方法，包括 GET、POST、PUT 和 OPTIONS
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // 允许的请求头，包括 Origin、Content-Type 和 Authorization
		ExposeHeaders:    []string{"Content-Length"},                          // 允许暴露的响应头，包括 Content-Length
		AllowCredentials: true,                                                // 允许携带凭证（如 cookies）
		MaxAge:           12 * time.Hour,                                      // 预检请求的缓存时间，单位为小时，这里设置为 12 小时
	}))

	// 定义一个路由组 auth，处理与认证相关的 API 路径
	auth := r.Group("/api/auth")
	{
		auth.POST("/login", controllers.Login)
		auth.POST("/register", controllers.Register)
	}

	// 定义一个路由组 api，处理与 API 相关的路径
	api := r.Group("/api")
	// 定义一个 GET 请求的路由，路径是 /api/exchangerates，处理函数是 controllers.GetExchangeRates
	api.GET("/exchangerates", controllers.GetExchangeRates)
	// 货币列表接口，不需要认证
	api.GET("/currencies", controllers.GetCurrencies)
	// 使用 AuthMiddleware 中间件，使得以下的 API 路径的具体 HTTP 请求需要进行身份验证才能访问
	api.Use(middlewares.AuthMiddleware())
	{
		api.POST("/exchangerates", controllers.CreateExchangeRate)

		api.POST("/articles", controllers.CreateArticle)
		api.GET("/articles", controllers.GetArticles)
		api.GET("/articles/my", controllers.GetMyArticles)
		api.GET("/articles/:id", controllers.GetArticleByID)

		api.POST("/articles/:id/like", controllers.LikeArticle)
		api.GET("/articles/:id/like", controllers.GetArticleLikes)
	}

	// 返回配置好的 Gin 引擎实例 r，供 main.go 中调用
	return r
}
