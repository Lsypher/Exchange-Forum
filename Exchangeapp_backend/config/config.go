package config

import (
	"log"
	"os"

	"github.com/spf13/viper"
)

// 定义配置结构体 Config
type Config struct {
	// App 配置
	App struct {
		Name string
		Port string
	}
	// MySQL 配置
	Database struct {
		Dsn          string
		MaxIdleConns int
		MaxOpenConns int
	}
	// Redis 配置
	Redis struct {
		Addr string
	}
	// JWT 配置
	JWT struct {
		Secret string
	}
	// AI 配置
	AI struct {
		BaseURL string
		APIKey  string
		Model   string
		Timeout int
	}
}

// 定义一个全局变量，类型是指向 Config 结构体的指针
var AppConfig *Config

// 初始化配置函数 InitConfig
func InitConfig() {

	// 设置 viper 要读取的配置文件的名称、类型和路径
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./config")

	// viper 读取配置文件，如果出错则记录日志并退出程序
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file: %v", err)
	}

	// Config{} 创建一个 Config 结构体的实例，AppConfig = &Config{} 将 Config 的地址赋值给全局变量 AppConfig，AppConfig 现在指向一块内存，这块内存存储的是一个 Config 结构体的实例
	AppConfig = &Config{}

	// viper 将读取的 config.yml 配置文件中的内容解码到 AppConfig 结构体中，如果出错则记录日志并退出程序
	if err := viper.Unmarshal(AppConfig); err != nil {
		log.Fatalf("Unable to decode into struct: %v", err)
	}

	// 环境变量覆盖（用于 Docker 部署）
	// 格式: DATABASE_DSN, REDIS_ADDR, JWT_SECRET, AI_APIKEY, AI_BASEURL
	if dsn := os.Getenv("DATABASE_DSN"); dsn != "" {
		AppConfig.Database.Dsn = dsn
	}
	if addr := os.Getenv("REDIS_ADDR"); addr != "" {
		AppConfig.Redis.Addr = addr
	}
	if secret := os.Getenv("JWT_SECRET"); secret != "" {
		AppConfig.JWT.Secret = secret
	}
	if apiKey := os.Getenv("AI_APIKEY"); apiKey != "" {
		AppConfig.AI.APIKey = apiKey
	}
	if baseURL := os.Getenv("AI_BASEURL"); baseURL != "" {
		AppConfig.AI.BaseURL = baseURL
	}
}
