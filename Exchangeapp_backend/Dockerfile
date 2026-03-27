# 后端 Dockerfile - 多阶段构建
# 构建阶段
FROM golang:1.25-alpine AS builder

# 使用清华镜像源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories && \
    apk add --no-cache gcc musl-dev

# 使用国内 Go 模块代理
ENV GOPROXY=https://goproxy.cn,direct

# 设置工作目录
WORKDIR /app

# 复制 go.mod 和 go.sum
COPY go.mod go.sum ./

# 下载依赖
RUN go mod download

# 复制源代码
COPY . .

# 构建二进制文件
RUN CGO_ENABLED=0 GOOS=linux go build -o exchangeapp .

# 运行阶段
FROM alpine:3.19

# 安装运行时依赖（ca-certificates 用于 HTTPS 请求）
# 使用国内镜像源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories && \
    apk add --no-cache ca-certificates tzdata

# 设置时区
ENV TZ=Asia/Shanghai

# 创建非 root 用户
RUN addgroup -g 1000 appgroup && adduser -u 1000 -G appgroup -s /bin/sh -D appuser

# 设置工作目录
WORKDIR /app

# 从构建阶段复制二进制文件
COPY --from=builder /app/exchangeapp .

# 从构建阶段复制配置文件（开发用，生产环境应使用卷挂载）
COPY --from=builder /app/config ./config

# 切换到非 root 用户
USER appuser

# 暴露端口
EXPOSE 8080

# 启动命令
CMD ["./exchangeapp"]
