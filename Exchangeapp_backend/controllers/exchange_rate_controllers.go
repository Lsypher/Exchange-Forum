package controllers

import (
	"errors"
	"exchangeapp/global"
	"exchangeapp/models"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// 创建汇率函数，接收一个 Gin 上下文对象作为参数，处理创建汇率的 HTTP 请求，首先将请求体中的 JSON 数据绑定到一个 ExchangeRate 结构体实例中，如果绑定失败，返回一个 HTTP 400 错误响应，包含错误信息
func CreateExchangeRate(ctx *gin.Context) {

	// 定义一个 ExchangeRate 结构体变量 exchangeRate，用于存储从请求体中绑定的汇率数据
	var exchangeRate models.ExchangeRate

	// 使用 ShouldBindJSON 方法将请求体中的 JSON 数据绑定到 exchangeRate 变量上，如果绑定失败，返回一个 HTTP 400 错误响应，包含错误信息
	if err := ctx.ShouldBindJSON(&exchangeRate); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 将当前的时间赋值给 exchangeRate 结构体的 Time 字段，以记录汇率数据的创建时间
	exchangeRate.Time = time.Now()

	// 先查找是否存在相同货币对的记录
	var existingRate models.ExchangeRate
	result := global.Db.Where("from_currency = ? AND to_currency = ?",
		exchangeRate.FromCurrency, exchangeRate.ToCurrency).First(&existingRate)

	if result.Error == gorm.ErrRecordNotFound {
		// 不存在则创建
		if err := global.Db.Create(&exchangeRate).Error; err != nil {
			log.Printf("Failed to create exchange rate: %v", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, exchangeRate)
	} else if result.Error == nil {
		// 存在则更新
		existingRate.Rate = exchangeRate.Rate
		existingRate.Time = exchangeRate.Time

		// .Save() 方法会根据主键 ID 来更新记录，如果 ID 不存在则会创建新记录，但这里我们已经确认了记录存在，所以不会有重复创建的问题
		if err := global.Db.Save(&existingRate).Error; err != nil {
			log.Printf("Failed to update exchange rate: %v", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, existingRate)
	} else {
		// 其他查询错误
		log.Printf("Failed to query exchange rate: %v", result.Error)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
	}
}

// 获取汇率列表函数，接受一个 Gin 上下文对象作为参数，处理获取汇率列表的 HTTP 请求，首先定义一个 ExchangeRate 结构体切片变量 exchangeRates，用于存储从数据库中查询到的汇率列表，然后使用 Find 方法从数据库中的 exchange_rates 表查询所有的汇率数据，并将结果存储在 exchangeRates 变量中，如果查询失败，且错误类型是 gorm.ErrRecordNotFound，表示没有找到任何汇率数据，此时返回一个 HTTP 404 错误响应，包含错误信息 "No exchange rates found"，如果查询失败但错误类型不是 gorm.ErrRecordNotFound，表示查询过程中发生了其他错误，此时返回一个 HTTP 500 错误响应，包含错误信息 "Failed to retrieve exchange rates"，如果查询成功，则返回一个 HTTP 200 成功响应，包含查询到的汇率列表数据
func GetExchangeRates(ctx *gin.Context) {

	// 定义一个 ExchangeRate 结构体切片变量 exchangeRates，用于存储从数据库中查询到的汇率列表
	var exchangeRates []models.ExchangeRate

	// 使用 Find 方法从数据库中的 exchange_rates 表查询所有的汇率数据，并将结果存储在 exchangeRates 变量中，如果查询失败，且错误类型是 gorm.ErrRecordNotFound，表示没有找到任何汇率数据，此时返回一个 HTTP 404 错误响应，包含错误信息 "No exchange rates found"，如果查询失败但错误类型不是 gorm.ErrRecordNotFound，表示查询过程中发生了其他错误，此时返回一个 HTTP 500 错误响应，包含错误信息 "Failed to retrieve exchange rates"，如果查询成功，则返回一个 HTTP 200 成功响应，包含查询到的汇率列表数据
	if err := global.Db.Find(&exchangeRates).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "No exchange rates found"})
			return
		} else {
			log.Printf("Failed to retrieve exchange rates: %v", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve exchange rates"})
			return
		}
	}

	// 返回一个 HTTP 200 成功响应，包含查询到的汇率列表数据
	ctx.JSON(http.StatusOK, exchangeRates)
}

// 获取货币列表函数，返回预设的常用货币列表
func GetCurrencies(ctx *gin.Context) {
	// 预设的常用货币列表
	currencies := []string{
		"USD", // 美元
		"EUR", // 欧元
		"CNY", // 人民币
		"JPY", // 日元
		"GBP", // 英镑
		"HKD", // 港币
		"KRW", // 韩元
		"AUD", // 澳元
		"CAD", // 加元
		"CHF", // 瑞士法郎
	}

	ctx.JSON(http.StatusOK, currencies)
}
