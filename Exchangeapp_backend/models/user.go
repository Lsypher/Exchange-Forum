package models

import "gorm.io/gorm"

// User 结构体，定义了用户的模型，包括 gorm.Model（包含 ID、CreatedAt、UpdatedAt 和 DeletedAt 字段）以及 Username 和 Password 字段，分别表示用户的用户名和密码
// 用于在数据库中存储用户数据，并且在创建和获取用户时进行数据绑定和验证
// GORM 会将 User 结构体映射到数据库中的 users 表
type User struct {
	gorm.Model
	Username string    `gorm:"unique;not null"`
	Password string    `gorm:"not null"`
	Articles []Article `json:"articles" gorm:"foreignKey:UserID"` // 添加此行 - 反向关联文章
}
