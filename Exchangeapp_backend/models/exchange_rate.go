package models

import "time"

// ExchangeRate 结构体，定义了汇率的模型，包括 ID、FromCurrency、ToCurrency、Rate 和 Time 字段，分别表示汇率的唯一标识符、源货币、目标货币、汇率值和时间戳
// 用于在数据库中存储汇率数据，并且在创建和获取汇率时进行数据绑定和验证
// GORM 会将 ExchangeRate 结构体映射到数据库中的 exchange_rates 表
type ExchangeRate struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	FromCurrency string    `gorm:"type:varchar(10);uniqueIndex:idx_currency_pair" json:"fromcurrency" binding:"required"` // 复合唯一索引，确保同一货币对只能有一条记录
	ToCurrency   string    `gorm:"type:varchar(10);uniqueIndex:idx_currency_pair" json:"tocurrency" binding:"required"`   // 复合唯一索引，确保同一货币对只能有一条记录
	Rate         float64   `json:"rate" binding:"required"`
	Time         time.Time `json:"time"`
}
