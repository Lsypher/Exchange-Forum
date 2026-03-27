# 汇流社区（Exchange Forum）

> 基于 **Go + Gin** 构建的汇率论坛社区，提供用户认证、汇率查询、文章发布和互动点赞功能。

![Go Version](https://img.shields.io/badge/Go-1.25.1-00ADD8?style=flat&logo=go)
![Gin](https://img.shields.io/badge/Gin-v1.11.0-blue?style=flat)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=flat&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-6.0+-DC382D?style=flat&logo=redis&logoColor=white)
![Vue3](https://img.shields.io/badge/Vue-3.x-42b883?style=flat&logo=vue.js)

##  项目简介

**汇流社区**是一个前后端分离的汇率论坛应用。后端使用 Go + Gin 构建 RESTful API，通过 Redis 缓存提升读取性能，使用 JWT 实现无状态身份认证；前端使用 Vue 3 + TypeScript 实现响应式界面，同时适配桌面端和移动端。

### 核心亮点

-  **JWT 无状态认证**：使用 JWT（HMAC-SHA256）+ bcrypt 实现安全的用户注册与登录，Token 有效期 72 小时
-  **Redis 缓存加速**：文章列表采用 Cache Aside 模式缓存（TTL 10 分钟），发布新文章时主动删除旧缓存，保证数据一致性
-  **Redis 缓存穿透保护**：空结果也会缓存，防止缓存击穿
-  **Redis 原子计数**：点赞功能使用 Redis `INCR` 原子操作，天然避免并发写入冲突
-  **GORM 连接池**：配置 MySQL 连接池（最大空闲连接 10，最大连接数 100），启动时自动 `AutoMigrate` 建表
-  **CORS 跨域支持**：通过 `gin-contrib/cors` 中间件配置细粒度跨域策略
-  **Viper 配置管理**：使用 Viper 读取 YAML 配置，支持灵活的环境隔离
-  **优雅停机**：`main.go` 实现 HTTP 服务器优雅关闭，保障服务平滑重启
-  **AI 内容审核**：创建文章时调用 OpenAI API 审核内容（暴力、色情、违法）
-  **Markdown 编辑器**：文章创建支持 Markdown 格式

##  系统架构

```
┌──────────────────────────────────────────────────────────────┐
│                        Client Layer                           │
│           Vue 3 + TypeScript (Vite / Port 5173)              │
│                   或 Docker Nginx (Port 80)                  │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTP / JSON (Axios)
┌────────────────────────▼────────────────────────────────────┐
│                     API Gateway Layer                        │
│               Go + Gin Framework (Port 8080)                 │
│                                                              │
│   ┌─────────────┐  ┌──────────────┐  ┌──────────────┐       │
│   │ CORS 中间件  │  │ JWT 认证中间件 │  │  Health 检查  │       │
│   └─────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐   │
│   │                  Controllers                          │   │
│   │    Auth | Article | ExchangeRate | Like               │   │
│   └──────────────────────────────────────────────────────┘   │
└─────────────────────┬──────────────────────┬─────────────────┘
                      │ GORM                 │ go-redis
        ┌─────────────▼───────────┐  ┌──────▼─────────────────┐
        │      MySQL 8.0+         │  │       Redis 6.0+       │
        │  · users                │  │  · articles_cache      │
        │  · articles             │  │  · article:{id}:likes  │
        │  · exchange_rates       │  └────────────────────────┘
        └─────────────────────────┘
```

### Docker Compose 架构

```
┌─────────────────────────────────────────────────────────────┐
│                      Docker Compose                          │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │  nginx   │  │  backend  │  │   mysql  │  │   redis   │  │
│  │(Frontend)│  │   (Go)    │  │          │  │           │  │
│  │  :80     │  │  :8080    │  │  :3306   │  │  :6379    │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬─────┘  │
└───────┼─────────────┼─────────────┼──────────────┼────────┘
        │             │             │              │
   Port 80     Port 8080      Port 3306      Port 6379
```

##  技术栈

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 语言 | Go | 1.25.1 | 后端核心语言 |
| Web 框架 | Gin | v1.11.0 | HTTP 路由与中间件 |
| ORM | GORM | v1.31.1 | 数据库操作与自动迁移 |
| 数据库 | MySQL | 8.0+ | 持久化存储 |
| 缓存 | Redis | 6.0+ | 列表缓存与点赞计数 |
| 认证 | JWT + bcrypt | jwt v3.2.2 | 无状态身份验证 |
| 配置 | Viper | v1.21.0 | YAML 配置管理 |
| 跨域 | gin-contrib/cors | v1.7.6 | CORS 处理 |
| 前端框架 | Vue 3 + TypeScript | Vue 3.4.21 | 响应式 UI |
| 前端构建 | Vite | v5.4.0 | 前端工程化 |
| 状态管理 | Pinia | v2.1.7 | 前端状态管理 |
| 路由 | Vue Router | v4.3.2 | 前端路由管理 |
| UI 组件 | Element Plus | 2.7.4 | 桌面端组件库 |
| UI 组件 | Vant | 4.9.0 | 移动端组件库 |
| HTTP 客户端 | Axios | 1.7.3 | API 请求 |
| Markdown | marked | 12.0.0 | Markdown 解析渲染 |

##  项目结构

```
Exchange-Forum/
├── Exchangeapp_backend/          # Go 后端
│   ├── config/
│   │   ├── config.go             # Viper 配置加载
│   │   ├── config.yml            # 应用配置文件
│   │   ├── db.go                 # MySQL 初始化与连接池配置
│   │   └── redis.go              # Redis 客户端初始化
│   ├── controllers/
│   │   ├── auth_controller.go    # 用户注册/登录
│   │   ├── article_controller.go # 文章 CRUD + Redis Cache Aside
│   │   ├── exchange_rate_controllers.go  # 汇率数据管理
│   │   └── like_controller.go    # 点赞（Redis INCR 原子操作）
│   ├── middlewares/
│   │   └── auth_middleware.go     # JWT 认证中间件
│   ├── models/
│   │   ├── user.go               # 用户数据模型
│   │   ├── article.go            # 文章数据模型
│   │   └── exchange_rate.go      # 汇率数据模型
│   ├── router/
│   │   └── router.go             # 路由注册与 CORS 配置
│   ├── utils/
│   │   ├── utils.go              # JWT 生成/解析、bcrypt 密码工具
│   │   └── ai.go                 # AI 内容审核（OpenAI API）
│   ├── global/
│   │   └── global.go             # 全局 DB / Redis 连接实例
│   ├── main.go                   # 入口：初始化 & 优雅停机
│   ├── Dockerfile                # Docker 构建配置
│   ├── .dockerignore             # Docker 忽略文件
│   ├── go.mod
│   └── go.sum
├── Exchangeapp_frontend/         # Vue 3 前端
│   ├── src/
│   │   ├── views/                # 页面组件
│   │   ├── components/           # 公共组件
│   │   ├── router/               # Vue Router 配置
│   │   ├── store/                # Pinia 状态管理
│   │   ├── types/                # TypeScript 类型定义
│   │   ├── styles/               # 样式文件
│   │   │   ├── github-theme.css  # GitHub 风格 Markdown 样式
│   │   │   └── element-overrides.css  # Element Plus 样式覆盖
│   │   ├── axios.ts              # Axios 实例与拦截器配置
│   │   └── main.ts               # 前端入口
│   ├── Dockerfile                # Docker 构建配置
│   ├── nginx.conf                # Nginx 反向代理配置
│   ├── .dockerignore             # Docker 忽略文件
│   ├── vite.config.ts            # Vite 配置（含 API 代理）
│   └── package.json
├── docker-compose.yml           # Docker Compose 开发环境配置
├── docker-compose.prod.yml      # Docker Compose 生产环境配置
├── .env.example                 # 环境变量模板
└── DEPLOY.md                    # Docker 部署指南
```

##  前端页面

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 | `HomeView.vue` | 平台介绍和功能入口 |
| 货币兑换 | `CurrencyExchangeView.vue` | 实时汇率计算 |
| 文章列表 | `NewsView.vue` | 论坛文章列表，需要登录访问 |
| 文章详情 | `NewsDetailView.vue` | Markdown 渲染、点赞、收藏、评论 |
| 创建文章 | `CreateArticleView.vue` | Markdown 编辑器，支持 AI 内容审核 |
| 用户中心 | `UserProfileView.vue` | 个人中心（我的文章、收藏文章、账户设置） |
| 登录/注册 | `LoginView.vue` / `RegisterView.vue` | 用户认证 |

##  快速开始

### 环境要求

| 工具 | 最低版本 |
|------|---------|
| Go | 1.25.1 |
| Node.js | 16+ |
| MySQL | 8.0+ |
| Redis | 6.0+ |
| Docker | 20.10+ |
| Docker Compose | 2.0+ |

### 方式一：Docker Compose 部署（推荐）

提供了两套 Docker Compose 配置：

| 文件 | 用途 | 特点 |
|------|------|------|
| `docker-compose.yml` | 开发环境 | 挂载代码目录，支持热重载 |
| `docker-compose.prod.yml` | 生产环境 | 资源限制，优化构建 |

1. **复制环境变量配置文件**

```bash
cp .env.example .env
# 编辑 .env 填入实际配置值
```

2. **启动所有服务**

```bash
# 开发环境
docker-compose up -d --build

# 生产环境
docker-compose -f docker-compose.prod.yml up -d --build
```

3. **验证服务**

- 后端 API：http://localhost:8080/api/exchangerates
- 前端页面：http://localhost:80
- 健康检查：http://localhost:8080/health

4. **常用命令**

```bash
# 开发环境
docker-compose ps
docker-compose logs -f backend
docker-compose restart backend
docker-compose down

# 生产环境
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml down -v
```

### 方式二：本地开发部署

#### 1. 初始化数据库

创建 MySQL 数据库（GORM 启动时会自动建表）：

```sql
CREATE DATABASE test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 2. 修改后端配置

编辑 `Exchangeapp_backend/config/config.yml`：

```yaml
app:
  name: CurrencyExchangeApp
  port: :8080

database:
  dsn: "root:yourpassword@tcp(127.0.0.1:3306)/test?charset=utf8mb4&parseTime=True&loc=Local"
  MaxIdleConns: 10
  MaxOpenConns: 100

redis:
  Addr: "localhost:6379"

jwt:
  Secret: "your-secret-key"  #  生产环境请替换为强随机字符串
```

#### 3. 启动后端

```bash
cd Exchangeapp_backend

# 下载依赖
go mod tidy

# 启动服务（监听 :8080）
go run main.go
```

#### 4. 启动前端

```bash
cd Exchangeapp_frontend

# 安装依赖
npm install

# 启动开发服务器（监听 :5173，已配置 API 代理）
npm run dev

# 构建生产包
npm run build
```

##  环境变量

项目支持通过环境变量覆盖配置文件中的默认值：

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `DATABASE_DSN` | MySQL 连接字符串 | config.yml 中的值 |
| `REDIS_ADDR` | Redis 地址（格式：host:port） | localhost:6379 |
| `JWT_SECRET` | JWT 密钥 | config.yml 中的值 |
| `AI_APIKEY` | OpenAI API Key | 空 |
| `AI_BASEURL` | OpenAI API 地址 | https://api.openai.com/v1 |

##  API 文档

所有接口均以 `/api` 为前缀。受保护接口需在请求头中携带 JWT Token：`Authorization: Bearer <token>`

### 系统接口

| 方法 | 路径 | 认证 | 说明 |
|------|------|------|------|
| GET | `/health` | 否 | 健康检查接口 |

### 认证接口（无需登录）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/register` | 用户注册，密码 bcrypt 加密存储 |
| POST | `/api/auth/login` | 用户登录，返回 JWT Token（有效期 72h） |

**请求示例：**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**登录响应示例：**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 汇率接口

| 方法 | 路径 | 认证 | 说明 |
|------|------|------|------|
| GET  | `/api/exchangerates` | 否 | 获取所有汇率列表 |
| POST | `/api/exchangerates` | 是 | 创建新汇率记录 |

### 文章接口

| 方法 | 路径 | 认证 | 说明 |
|------|------|------|------|
| GET  | `/api/articles` | 否 | 获取文章列表（Redis 缓存 10 分钟） |
| GET  | `/api/articles/my` | 是 | 获取当前用户的文章 |
| GET  | `/api/articles/:id` | 否 | 获取指定文章详情 |
| POST | `/api/articles` | 是 | 发布新文章（需 AI 审核），同时删除列表缓存 |

### 点赞接口

| 方法 | 路径 | 认证 | 说明 |
|------|------|------|------|
| POST | `/api/articles/:id/like` | 是 | 点赞文章（Redis INCR 原子操作），返回点赞数 |
| GET  | `/api/articles/:id/like` | 是 | 获取文章点赞数 |

**响应示例：**
```json
{
  "likes": 42
}
```

##  核心设计

### Redis 缓存策略

| 场景 | Key 格式 | TTL | 策略 |
|------|---------|-----|------|
| 文章列表缓存 | `articles_cache` | 10 分钟 | Cache Aside：发布新文章时主动删除缓存 |
| 文章列表空结果缓存 | `articles_cache` | 1 分钟 | 缓存穿透保护：空结果也缓存，防止缓存击穿 |
| 文章点赞计数 | `article:{id}:likes` | 永久 | Redis `INCR` 原子操作，无并发冲突 |

> **缓存穿透保护**：当数据库查询结果为空时，仍会将空结果存入 Redis（TTL 1 分钟），避免大量请求直接穿透到数据库。

### JWT 认证流程

```
客户端  →  POST /api/auth/login  →  服务端验证密码（bcrypt.CompareHashAndPassword）
服务端  →  签发 JWT（HMAC-SHA256，72h 有效期）  →  返回 token 给客户端
客户端  →  请求头携带 Authorization: Bearer <token>  →  访问受保护接口
服务端  →  AuthMiddleware 解析并验证 Token  →  提取用户名注入 Gin Context
```

### MySQL 连接池配置

```go
sqlDB.SetMaxIdleConns(10)   // 最大空闲连接数
sqlDB.SetMaxOpenConns(100)  // 最大连接数上限
```

##  开发注意事项

1. **JWT 密钥**：默认密钥为 `"secret"`，**生产环境必须替换**为高强度随机字符串
2. **端口**：后端默认运行在 `:8080`，前端开发服务器在 `:5173`，Vite 已配置代理转发 `/api` 请求
3. **CORS**：开发环境仅允许 `http://localhost:5173` 跨域，Docker 部署时通过 nginx 反向代理无需考虑跨域
4. **自动建表**：应用启动时 GORM 通过 `AutoMigrate` 自动创建/同步数据库表结构，无需手动建表
5. **Docker 部署**：生产环境推荐使用 `docker-compose up -d --build` 一键部署

##  部署文档

详细部署说明请参考 [DEPLOY.md](DEPLOY.md)。

##  贡献

欢迎提交 Issue 和 Pull Request 来改进本项目。

