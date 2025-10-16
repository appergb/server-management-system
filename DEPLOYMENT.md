# 部署文档 / Deployment Guide

## 在线演示 / Live Demo

🎉 **应用已成功部署上线！**

**访问地址**：https://77h9ikcyj3wy.manus.space

## 部署信息 / Deployment Information

### 部署平台
- **平台**：Manus Cloud Platform
- **类型**：全栈应用（Flask + React）
- **状态**：✅ 运行中

### 技术栈
- **前端**：React 18 + Vite + Tailwind CSS
- **后端**：Flask 3.x + SQLAlchemy
- **数据库**：SQLite
- **部署方式**：容器化部署

### 功能特性
- ✅ 液态玻璃UI设计
- ✅ 服务器列表管理
- ✅ 实时监控数据（模拟）
- ✅ 深色/浅色模式切换
- ✅ 响应式布局
- ✅ 流畅动画效果

## 本地部署 / Local Deployment

### 方式一：Docker Compose（推荐）

```bash
# 克隆项目
git clone https://github.com/appergb/server-management-system.git
cd server-management-system

# 启动服务
docker-compose up -d

# 访问应用
# 直接访问：http://localhost:5000
# 通过Nginx：http://localhost
```

### 方式二：手动部署

#### 前端开发
```bash
cd server-management-system
pnpm install
pnpm run dev
# 访问 http://localhost:5173
```

#### 后端开发
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
# 访问 http://localhost:5000
```

#### 生产构建
```bash
# 构建前端
cd server-management-system
pnpm run build

# 复制到后端static目录
cp -r dist/* ../backend/src/static/

# 启动后端（包含前端）
cd ../backend
source venv/bin/activate
python src/main.py
# 访问 http://localhost:5000
```

## 环境要求 / Requirements

### Docker部署
- Docker 20.10+
- Docker Compose 2.0+

### 手动部署
- Node.js 18+
- Python 3.11+
- pnpm 8+

## 配置说明 / Configuration

### 环境变量
```bash
# Flask配置
FLASK_ENV=production
SECRET_KEY=your-secret-key

# 数据库配置
DATABASE_URL=sqlite:///database/app.db

# 服务器配置
HOST=0.0.0.0
PORT=5000
```

### 端口配置
- **前端开发**：5173
- **后端API**：5000
- **Nginx**：80/443

## API文档 / API Documentation

### 基础URL
- **生产环境**：https://77h9ikcyj3wy.manus.space/api
- **本地开发**：http://localhost:5000/api

### 主要接口

#### 服务器管理
```
GET    /api/servers           # 获取服务器列表
POST   /api/servers           # 添加服务器
GET    /api/servers/:id       # 获取服务器详情
PUT    /api/servers/:id       # 更新服务器
DELETE /api/servers/:id       # 删除服务器
```

#### 监控数据
```
GET    /api/servers/:id/metrics          # 获取实时指标
GET    /api/servers/:id/metrics/history  # 获取历史数据
GET    /api/overview                     # 获取系统概览
```

#### 操作接口
```
POST   /api/servers/:id/execute   # 执行命令
POST   /api/servers/:id/connect   # 测试连接
```

## 故障排查 / Troubleshooting

### 常见问题

#### 1. 前端无法连接后端
- 检查CORS配置
- 确认后端服务已启动
- 检查API端口是否正确

#### 2. Docker容器无法启动
- 检查端口是否被占用
- 查看容器日志：`docker-compose logs`
- 确认Docker版本兼容性

#### 3. 数据库连接失败
- 检查数据库文件权限
- 确认数据库目录存在
- 查看SQLAlchemy配置

### 日志查看

#### Docker日志
```bash
# 查看所有服务日志
docker-compose logs

# 查看特定服务日志
docker-compose logs backend
docker-compose logs nginx
```

#### 应用日志
```bash
# Flask日志
tail -f backend/logs/app.log

# Nginx日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## 性能优化 / Performance Optimization

### 前端优化
- ✅ 代码分割（Code Splitting）
- ✅ 懒加载（Lazy Loading）
- ✅ 资源压缩（Gzip/Brotli）
- ✅ 缓存策略（Cache Strategy）

### 后端优化
- ✅ 数据库索引
- ✅ API响应缓存
- ✅ 连接池管理
- ✅ 异步任务处理

## 安全建议 / Security Recommendations

### 生产环境配置
1. **修改默认密钥**
   ```python
   SECRET_KEY = 'your-strong-random-secret-key'
   ```

2. **启用HTTPS**
   - 配置SSL证书
   - 强制HTTPS重定向

3. **数据库安全**
   - 使用PostgreSQL替代SQLite
   - 启用数据库加密
   - 定期备份数据

4. **访问控制**
   - 实现用户认证
   - 配置RBAC权限
   - 限制API访问频率

## 更新日志 / Changelog

### v1.0.0 (2025-10-16)
- ✅ 初始版本发布
- ✅ 液态玻璃UI设计
- ✅ 服务器管理功能
- ✅ 实时监控展示
- ✅ Docker容器化
- ✅ GitHub开源
- ✅ 在线部署

## 支持与反馈 / Support & Feedback

### GitHub仓库
https://github.com/appergb/server-management-system

### 问题反馈
https://github.com/appergb/server-management-system/issues

### 贡献指南
欢迎提交Pull Request和Issue！

---

**Made with ❤️ by Server Management System Team**

