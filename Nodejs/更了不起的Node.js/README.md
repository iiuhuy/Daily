# 更了不起的 Node.js

## libuv 事件循环处理库

## 特点

- 适合构建 Web 应用
    - 构建网站
    - 构建 API
    - 构建 RPC 服务
    - 前后端分离
    - 适用于 Serverless
- 高性能
    - 执行速度快
    - 天生异步
    - 适用于 I/O 密集型的网络应用开发
- 简单
- 可扩展

# 3M 安装法

- nvm(node version manager): 用于开发阶段，解决多版本共存、切换、测试等问题
- npm(node package manager): 解决 Node.js 模块安装问题，其本身也是一个 Node.js 模块，每次安装都会内置某个版本的 npm
- nrm(node registry manager): 解决 npm 镜像访问慢的问题，提供测速、切换下载(registry)源功能。

从源码编译

    $ sudo apt-get install g++ curl libssl-dev apach2-utils git-core build-essential
    # 下载源码并编译
    $ git clone https://github.com/nodejs/node.git
    $ cd node
    $ ./configure
    $ make 
    $ sudo make install

node 在命令行里可用就说明安装成功了。

# 从 LAMP 到 MEAN 到服务化

服务化：RPC 服务、服务组装、页面即服务。

## 前后端分离

- 表现层：处理 HTTP 请求
- 业务逻辑层：完成具体的业务逻辑
- 数据访问层：访问基础数据，例如数据库、缓存、消息队列等

Java 后端的分层清晰

- 先定义模型层(Model)，数据库操作一般采用 ORM 库来简化操作，模型会和数据库里的表进行关联映射
- DAO (Data Access Object)，就是我们常说的增删改查，主要对单个模型进行操作
- Service 层就是业务逻辑层，通常组合多个对象进行某项业务处理
- Controlller 里组装了多个 Service 对象，可实现具体的功能