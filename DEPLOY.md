# Docker 部署指南

## 部署步骤

1. **后端文件夹**创建 `Dockerfile`，配置多阶段构建和国内镜像源

2. **前端文件夹**创建 `Dockerfile` 和 `nginx.conf`，配置 Vue 构建和反向代理

3. **后端 config.go** 添加环境变量覆盖支持（`DATABASE_DSN`、`REDIS_ADDR` 等）

4. **后端 router.go** 添加 `/health` 健康检查端点，扩展 CORS 支持

5. **项目根目录**创建 `docker-compose.yml`，编排 MySQL、Redis、Backend、Frontend 四个服务

6. 运行 `docker-compose up -d --build` 构建并启动

## 启动项目

```bash
# 启动所有服务（后台运行）
docker-compose up -d

# 第一次运行需要构建镜像
docker-compose up -d --build
```

## 关闭项目

```bash
# 停止所有服务（保留数据）
docker-compose down

# 停止并删除数据（清空数据库）
docker-compose down -v
```

## 其他常用命令

```bash
# 查看状态
docker-compose ps

# 查看日志
docker-compose logs -f backend

# 重启某个服务
docker-compose restart backend
```
