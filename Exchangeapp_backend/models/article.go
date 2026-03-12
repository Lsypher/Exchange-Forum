package models

import "gorm.io/gorm"

// Article 结构体，定义了文章的模型，包括 gorm.Model（包含 ID、CreatedAt、UpdatedAt 和 DeletedAt 字段）以及 Title、Content 和 Preview 字段，分别表示文章的标题、内容和预览信息
// 用于在数据库中存储文章数据，并且在创建和获取文章时进行数据绑定和验证
// GORM 会将 Article 结构体映射到数据库中的 articles 表
type Article struct {
	gorm.Model
	Title   string `json:"title" binding:"required" gorm:"index:idx_article_title"`   // 文章标题，必须提供，添加索引以提升搜索性能
	Content string `json:"content" binding:"required"`                               // 文章内容，必须提供
	Preview string `json:"preview"`                                                // 文章预览信息，AI自动生成
	UserID  uint   `json:"user_id" gorm:"not null;index:idx_article_user_id"`        // 用户ID，关联到用户，添加索引以提升查询性能
	User    User   `json:"user" gorm:"foreignKey:UserID"`                            // 添加此行，用于预加载
}
