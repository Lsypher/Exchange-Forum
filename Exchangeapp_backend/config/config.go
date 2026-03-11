package config

import (
	"log"

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
}
