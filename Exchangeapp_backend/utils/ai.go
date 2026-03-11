package utils

// 引入 Go 标准库和其他依赖包
import (
	"bytes"        // 用于创建字节缓冲区，存储要发送的 JSON 数据
	"encoding/json" // 用于 JSON 数据的序列化和反序列化
	"fmt"          // 用于格式化字符串和错误信息
	"io"           // 用于读取 HTTP 响应体
	"net/http"     // 用于发送 HTTP 请求
	"time"         // 用于处理超时时间

	"exchangeapp/config" // 引入项目配置包，获取 AI 配置信息
)

// ===================== 结构体定义 =====================

// ChatMessage 表示聊天请求中的一条消息
// 用于构建发送给 OpenAI API 的消息数组
// Role: 消息角色，可以是 "system"（系统）、"user"（用户）、"assistant"（助手）
// Content: 消息的具体内容
type ChatMessage struct {
	Role    string `json:"role"`    // 消息角色，JSON 字段名为 "role"
	Content string `json:"content"` // 消息内容，JSON 字段名为 "content"
}

// ChatRequest 表示发送给 OpenAI Chat API 的请求结构
// 对应 OpenAI API 的 /chat/completions 接口
// Model: 要使用的模型名称，如 "gpt-3.5-turbo"
// Messages: 消息数组，包含对话历史
type ChatRequest struct {
	Model    string        `json:"model"`     // 使用的模型，JSON 字段名为 "model"
	Messages []ChatMessage `json:"messages"` // 消息列表，JSON 字段名为 "messages"
}

// ChatResponse 表示从 OpenAI Chat API 返回的响应结构
// 只包含我们关心的字段，其他字段被忽略
// Choices: 返回的选择数组，通常包含 AI 的回复
type ChatResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"` // AI 回复的内容
		} `json:"message"`
	} `json:"choices"`
}

// ===================== 核心函数 =====================

// ModerateContent 使用 OpenAI API 对内容进行审核
//
// 参数:
//   - text: 待审核的文本内容，通常是文章的标题和内容拼接而成
//
// 返回值:
//   - bool: 内容是否通过审核，true 表示通过，false 表示未通过
//   - string: 如果未通过，返回拒绝原因；如果通过，返回空字符串
//   - error: 如果调用 API 时发生错误，返回错误信息；如果成功，返回 nil
func ModerateContent(text string) (bool, string, error) {
	// ===================== 配置检查 =====================
	// 检查 AI 配置是否有效
	// 如果 BaseURL 为空、APIKey 为空、或者 APIKey 是默认值 "your-api-key"，则跳过审核
	// 这样设计是为了在开发环境或不配置 AI 时不影响正常功能
	if config.AppConfig.AI.BaseURL == "" || config.AppConfig.AI.APIKey == "" || config.AppConfig.AI.APIKey == "your-api-key" {
		// AI 未配置，跳过审核，直接返回通过
		return true, "", nil
	}

	// ===================== 构建审核提示词 =====================
	// 系统提示词：告诉 AI 扮演内容审核员的角色
	// 明确列出需要检测的违规类型
	systemPrompt := `你是一个内容审核员。请检查以下内容是否包含：
- 暴力、仇恨言论
- 色情、淫秽内容
- 违法、犯罪行为
- 诈骗、虚假信息
- 其他不当内容

如果内容安全，返回：PASS
如果内容不安全，返回：REJECT:具体原因`

	// 用户提示词：将待审核的内容包装成审核请求
	// 使用 fmt.Sprintf 来格式化字符串，将待审核文本嵌入到提示词中
	userContent := fmt.Sprintf("请审核以下内容：\n\n标题+内容：%s", text)

	// ===================== 构建请求体 =====================
	// 创建 ChatRequest 结构体，包含模型名称和消息数组
	// 消息数组包含两条消息：系统消息（审核规则）和用户消息（待审核内容）
	reqBody := ChatRequest{
		Model: config.AppConfig.AI.Model, // 从配置中读取模型名称，如 "gpt-3.5-turbo"
		Messages: []ChatMessage{
			// 第一条：系统消息，定义 AI 的角色和行为
			{Role: "system", Content: systemPrompt},
			// 第二条：用户消息，包含待审核的内容
			{Role: "user", Content: userContent},
		},
	}

	// ===================== 序列化请求体 =====================
	// 将 reqBody 结构体转换为 JSON 格式的字节数组
	// 这是发送 HTTP POST 请求的必要步骤
	jsonBody, err := json.Marshal(reqBody)
	if err != nil {
		// 如果序列化失败，返回错误
		// 使用 %w 包装错误，保持错误链的完整性
		return false, "", fmt.Errorf("请求序列化失败: %w", err)
	}

	// ===================== 创建 HTTP 客户端 =====================
	// 从配置中读取超时时间（秒），转换为 time.Duration 类型
	// 创建一个带有超时设置的 HTTP 客户端，防止 API 调用无限期等待
	timeout := time.Duration(config.AppConfig.AI.Timeout) * time.Second
	client := &http.Client{Timeout: timeout}

	// ===================== 创建 HTTP 请求 =====================
	// 构建 POST 请求，URL 为 API 基础地址 + "/chat/completions"
	// 请求体为前面序列化的 JSON 数据
	req, err := http.NewRequest("POST", config.AppConfig.AI.BaseURL+"/chat/completions", bytes.NewBuffer(jsonBody))
	if err != nil {
		// 如果创建请求失败，返回错误
		return false, "", fmt.Errorf("创建请求失败: %w", err)
	}

	// ===================== 设置请求头 =====================
	// 设置 Content-Type 为 application/json，告诉服务器发送的是 JSON 数据
	req.Header.Set("Content-Type", "application/json")
	// 设置 Authorization 为 Bearer Token 认证方式
	// 格式："Bearer " + API Key
	req.Header.Set("Authorization", "Bearer "+config.AppConfig.AI.APIKey)

	// ===================== 发送请求 =====================
	// 使用 client.Do() 发送 HTTP 请求并获取响应
	resp, err := client.Do(req)
	if err != nil {
		// 如果发送请求失败（如网络超时、连接失败），返回错误
		return false, "", fmt.Errorf("发送请求失败: %w", err)
	}
	// 注意：必须关闭响应体，以释放网络资源
	// 使用 defer 确保函数返回前一定会执行
	defer resp.Body.Close()

	// ===================== 读取响应体 =====================
	// 从响应体中读取所有数据到字节数组
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		// 如果读取响应失败，返回错误
		return false, "", fmt.Errorf("读取响应失败: %w", err)
	}

	// ===================== 检查响应状态码 =====================
	// HTTP 状态码 200 表示成功，其他状态码表示出错
	if resp.StatusCode != http.StatusOK {
		// 如果 API 返回错误状态码，包装错误信息并返回
		// 包含状态码和响应内容，便于调试
		return false, "", fmt.Errorf("API 返回错误状态码 %d: %s", resp.StatusCode, string(body))
	}

	// ===================== 解析响应 JSON =====================
	// 将响应体的 JSON 数据反序列化为 ChatResponse 结构体
	var chatResp ChatResponse
	if err := json.Unmarshal(body, &chatResp); err != nil {
		// 如果 JSON 解析失败，返回错误
		return false, "", fmt.Errorf("解析响应失败: %w", err)
	}

	// ===================== 检查响应内容 =====================
	// 确保 API 返回了至少一个选择（即 AI 的回复）
	if len(chatResp.Choices) == 0 {
		// 如果没有回复，返回错误
		return false, "", fmt.Errorf("AI 未返回任何内容")
	}

	// 获取 AI 的回复内容
	content := chatResp.Choices[0].Message.Content

	// ===================== 解析审核结果 =====================
	// AI 的回复格式只有两种：
	// 1. "PASS" - 内容安全，通过审核
	// 2. "REJECT:具体原因" - 内容不安全，拒绝审核

	// 检查回复是否以 "PASS" 开头
	if len(content) >= 4 && content[:4] == "PASS" {
		// 内容通过审核，返回 true（通过）、空字符串（无拒绝原因）、nil（无错误）
		return true, "", nil
	}

	// 检查回复是否以 "REJECT:" 开头
	if len(content) >= 7 && content[:7] == "REJECT:" {
		// 内容未通过审核，提取拒绝原因
		// content[7:] 表示从第 8 个字符开始取剩余部分，即具体的拒绝原因
		reason := content[7:]
		// 返回 false（未通过）、拒绝原因、nil（无错误）
		return false, reason, nil
	}

	// ===================== 兜底处理 =====================
	// 如果 AI 的回复格式不符合预期（既不是 PASS 也不是 REJECT:），
	// 为了不影响用户体验，视为通过审核，但可以记录日志警告
	// 在生产环境中，这种情况应该记录日志以便排查问题
	return true, "", nil
}
