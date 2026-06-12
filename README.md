# 美家家装 - 前后端分离项目

## 项目结构

```
美家家装/
├── backend/                    # Spring Boot 后端
│   ├── src/
│   │   └── main/
│   │       ├── java/com/meijia/
│   │       │   ├── MeijiaApplication.java    # 启动类
│   │       │   ├── config/                   # 配置类
│   │       │   ├── controller/               # API 控制器
│   │       │   ├── model/                    # 数据模型
│   │       │   └── service/                  # 业务逻辑
│   │       └── resources/
│   │           └── application.yml           # 配置文件
│   └── pom.xml                               # Maven 配置
├── frontend/                   # 前端页面
│   ├── css/
│   │   └── style.css          # 全局样式
│   ├── js/
│   │   └── api.js             # API 调用封装
│   ├── pages/
│   │   ├── login.html         # 登录注册
│   │   ├── products.html      # 商品列表
│   │   ├── product-detail.html # 商品详情
│   │   ├── orders.html        # 订单管理
│   │   ├── post-demand.html   # 发布需求
│   │   ├── find-designer.html # 找设计师
│   │   ├── calculator.html    # 预算计算器
│   │   ├── ai-design.html     # AI智能设计
│   │   └── profile.html       # 个人中心
│   └── index.html             # 首页
└── 启动项目.bat               # Windows 启动脚本
```

## 功能模块

### 用户系统
- 用户注册（用户名 + 手机号 + 密码）
- 用户登录（支持用户名或手机号登录）
- JWT Token 认证
- 个人中心

### 商品商城（参考淘宝）
- 商品分类浏览（瓷砖、卫浴、灯具、定制等）
- 商品搜索
- 热门商品推荐
- 商品详情页
- 下单购买

### 装修服务
- 发布装修需求
- 找设计师
- 预算计算器
- AI智能设计入口

### 订单管理
- 创建订单
- 订单列表
- 订单状态筛选
- 模拟支付

## 运行方式

### 方式一：使用启动脚本（推荐）
1. 双击 `启动项目.bat`
2. 等待依赖下载完成
3. 访问 http://localhost:8080/index.html

### 方式二：手动运行

#### 1. 安装 Maven
下载 Maven: https://maven.apache.org/download.cgi
解压后将 bin 目录添加到系统 PATH

#### 2. 启动后端
```bash
cd backend
mvn spring-boot:run
```

#### 3. 访问前端
浏览器打开: http://localhost:8080/index.html

## 技术栈

### 后端
- Java 17
- Spring Boot 3.2
- Spring Data JPA
- H2 数据库（嵌入式，无需安装）
- JWT 认证

### 前端
- HTML5
- CSS3（响应式设计）
- JavaScript（原生，无框架依赖）

## API 接口

### 用户相关
- POST /api/user/register - 注册
- POST /api/user/login - 登录
- GET /api/user/info - 获取用户信息

### 商品相关
- GET /api/product/list - 商品列表
- GET /api/product/hot - 热门商品
- GET /api/product/{id} - 商品详情

### 订单相关
- POST /api/order/create - 创建订单
- GET /api/order/list - 订单列表
- POST /api/order/pay/{orderNo} - 支付订单

### 需求相关
- POST /api/demand/create - 发布需求
- GET /api/demand/list - 我的需求

## 数据库

使用 H2 嵌入式数据库，无需额外安装。
- 控制台地址: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:file:./data/meijia
- 用户名: sa
- 密码: （空）

## 后续扩展

- [ ] 消息/聊天功能
- [ ] 图片上传功能
- [ ] 支付集成
- [ ] 短信验证码
- [ ] 微信登录
- [ ] 管理后台
