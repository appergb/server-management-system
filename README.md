# Server Management System - 服务器管理系统

<div align="center">

![Server Management System](https://img.shields.io/badge/Server-Management-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![Flask](https://img.shields.io/badge/Flask-3.x-000000)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ed)

**一个功能齐全、界面现代化的服务器管理系统**

[English](#english) | [中文](#中文)

</div>

---

## 中文

### 项目简介

Server Management System 是一个开源的服务器管理平台，提供直观的Web界面来管理和监控多台服务器。系统采用现代化的**液态玻璃（Glassmorphism）**设计风格，支持多种服务器类型，提供实时监控、远程操作、任务调度等完整功能。

### 核心特性

#### 🎨 现代化UI设计
- **液态玻璃效果**：半透明模糊背景，视觉效果出众
- **卡片式布局**：类似iOS设置界面，清晰直观
- **深色/浅色模式**：支持主题切换
- **响应式设计**：完美适配各种屏幕尺寸
- **流畅动画**：平滑过渡和悬停效果

#### 🖥️ 服务器管理
- **多服务器类型支持**：Linux、Windows、Docker、Kubernetes
- **实时监控**：CPU、内存、磁盘、网络流量
- **远程操作**：命令执行、文件传输、服务管理
- **批量操作**：同时管理多台服务器
- **连接管理**：SSH、RDP、API多种连接方式

#### 📊 监控与告警
- **实时指标**：动态更新服务器状态
- **历史数据**：性能趋势分析
- **自定义告警**：灵活的告警规则配置
- **可视化图表**：直观的数据展示

#### ⚙️ 自动化功能
- **任务调度**：定时任务、Cron任务
- **脚本管理**：脚本库和执行
- **部署自动化**：支持CI/CD集成

### 技术栈

#### 前端
- **框架**：React 18.x
- **构建工具**：Vite
- **UI组件**：shadcn/ui + Tailwind CSS
- **图标**：Lucide Icons
- **动画**：Framer Motion
- **图表**：Recharts

#### 后端
- **框架**：Flask 3.x
- **数据库**：SQLite / PostgreSQL
- **ORM**：SQLAlchemy
- **监控**：psutil
- **SSH**：Paramiko

#### 部署
- **容器化**：Docker + Docker Compose
- **反向代理**：Nginx
- **支持平台**：任何支持Docker的环境

### 快速开始

#### 前置要求
- Docker 20.10+
- Docker Compose 2.0+

#### 使用Docker Compose（推荐）

1. **克隆项目**
```bash
git clone https://github.com/yourusername/server-management-system.git
cd server-management-system
```

2. **启动服务**
```bash
docker-compose up -d
```

3. **访问应用**
- 直接访问：http://localhost:5000
- 通过Nginx：http://localhost

#### 本地开发

##### 前端开发
```bash
cd server-management-system
pnpm install
pnpm run dev
```

##### 后端开发
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
```

### 项目结构

```
.
├── server-management-system/    # 前端项目
│   ├── src/
│   │   ├── components/         # React组件
│   │   ├── hooks/              # 自定义Hooks
│   │   ├── assets/             # 静态资源
│   │   ├── App.jsx             # 主应用组件
│   │   └── App.css             # 样式文件
│   ├── public/                 # 公共资源
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # 后端项目
│   ├── src/
│   │   ├── models/             # 数据模型
│   │   ├── routes/             # API路由
│   │   ├── static/             # 前端构建产物
│   │   ├── database/           # SQLite数据库
│   │   └── main.py             # Flask应用入口
│   ├── Dockerfile
│   └── requirements.txt
│
├── nginx/                       # Nginx配置
│   └── nginx.conf
│
├── docker-compose.yml           # Docker编排
└── README.md
```

### API文档

#### 服务器管理
- `GET /api/servers` - 获取服务器列表
- `POST /api/servers` - 添加服务器
- `GET /api/servers/:id` - 获取服务器详情
- `PUT /api/servers/:id` - 更新服务器
- `DELETE /api/servers/:id` - 删除服务器

#### 监控
- `GET /api/servers/:id/metrics` - 获取实时指标
- `GET /api/servers/:id/metrics/history` - 获取历史数据
- `GET /api/overview` - 获取系统概览

#### 操作
- `POST /api/servers/:id/execute` - 执行命令
- `POST /api/servers/:id/connect` - 测试连接

### 配置说明

#### 环境变量
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

#### Docker配置
编辑 `docker-compose.yml` 修改端口映射、环境变量等配置。

### 性能优化

- **前端优化**：代码分割、懒加载、资源压缩
- **后端优化**：数据库索引、连接池、缓存
- **网络优化**：Gzip压缩、HTTP/2、CDN

### 安全考虑

- **认证授权**：JWT Token认证
- **数据加密**：密码加密存储（bcrypt）
- **HTTPS支持**：SSL/TLS加密通信
- **防护措施**：SQL注入防护、XSS防护、CSRF防护

### 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发路线图

- [x] 基础服务器管理功能
- [x] 实时监控和指标展示
- [x] 液态玻璃UI设计
- [x] Docker容器化部署
- [ ] WebSocket实时推送
- [ ] 用户认证和权限管理
- [ ] 告警系统
- [ ] 任务调度
- [ ] Kubernetes集成
- [ ] 移动端适配
- [ ] 多语言支持

### 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

### 联系方式

- **项目主页**：https://github.com/yourusername/server-management-system
- **问题反馈**：https://github.com/yourusername/server-management-system/issues
- **讨论区**：https://github.com/yourusername/server-management-system/discussions

### 致谢

感谢所有开源项目的贡献者，特别是：
- React Team
- Flask Team
- shadcn/ui
- Tailwind CSS
- Lucide Icons

---

## English

### Introduction

Server Management System is an open-source server management platform that provides an intuitive web interface for managing and monitoring multiple servers. The system features a modern **Glassmorphism** design style, supports various server types, and offers comprehensive functionality including real-time monitoring, remote operations, and task scheduling.

### Key Features

#### 🎨 Modern UI Design
- **Glassmorphism Effect**: Semi-transparent blurred background with stunning visual effects
- **Card-based Layout**: Similar to iOS settings interface, clear and intuitive
- **Dark/Light Mode**: Theme switching support
- **Responsive Design**: Perfect adaptation to various screen sizes
- **Smooth Animations**: Seamless transitions and hover effects

#### 🖥️ Server Management
- **Multi-server Type Support**: Linux, Windows, Docker, Kubernetes
- **Real-time Monitoring**: CPU, Memory, Disk, Network traffic
- **Remote Operations**: Command execution, file transfer, service management
- **Batch Operations**: Manage multiple servers simultaneously
- **Connection Management**: SSH, RDP, API multiple connection methods

#### 📊 Monitoring & Alerting
- **Real-time Metrics**: Dynamic server status updates
- **Historical Data**: Performance trend analysis
- **Custom Alerts**: Flexible alert rule configuration
- **Visual Charts**: Intuitive data presentation

#### ⚙️ Automation Features
- **Task Scheduling**: Scheduled tasks, Cron jobs
- **Script Management**: Script library and execution
- **Deployment Automation**: CI/CD integration support

### Tech Stack

#### Frontend
- **Framework**: React 18.x
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Icons**: Lucide Icons
- **Animation**: Framer Motion
- **Charts**: Recharts

#### Backend
- **Framework**: Flask 3.x
- **Database**: SQLite / PostgreSQL
- **ORM**: SQLAlchemy
- **Monitoring**: psutil
- **SSH**: Paramiko

#### Deployment
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Supported Platforms**: Any Docker-compatible environment

### Quick Start

#### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

#### Using Docker Compose (Recommended)

1. **Clone the project**
```bash
git clone https://github.com/yourusername/server-management-system.git
cd server-management-system
```

2. **Start services**
```bash
docker-compose up -d
```

3. **Access the application**
- Direct access: http://localhost:5000
- Via Nginx: http://localhost

#### Local Development

##### Frontend Development
```bash
cd server-management-system
pnpm install
pnpm run dev
```

##### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contact

- **Project Homepage**: https://github.com/yourusername/server-management-system
- **Issue Tracker**: https://github.com/yourusername/server-management-system/issues
- **Discussions**: https://github.com/yourusername/server-management-system/discussions

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给它一个星标！**

**⭐ If this project helps you, please give it a star!**

Made with ❤️ by the Server Management System Team

</div>

