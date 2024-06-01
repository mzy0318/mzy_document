---
title: nginx基本介绍
---

# nginx基本介绍

## 基本命令
- `nginx -s stop` 快速停止
- `nginx -s quit` 优雅关闭，在退出前完成接受的连接请示
- `nginx -s reload` 重新加载配置

## 目录结构
- `conf`: 配置文件目录
- `html`: 静态资源目录
- `logs`: 日志目录
    - `access.log`: 访问日志文件
    - `error.log`: 错误日志文件
    - `nginx.pid`: nginx进程id


## 配置文件

### 基本配置项
- worker_processes：子进程个数，通常对应到当前服务器的CPU的核心数
- events：事件驱动模块
    - worker_connections：每个进程可以创建多少个连接
- http：
    - include：将其他配置文件引用到当前配置下面
    - default_type：默认MIME类型
    - sendfile：数据0拷贝，
    - keepalive_timeout：保持连接，超时时间
    - server：一个虚拟主机配置vhost
        - listen：当前主机监听的端口号
        - server_name：当前主机名，可以配置为`域名`、`主机名`
        - location：虚拟目录配置或URL配置
            - root：相对路径，相对于nginx主目录，及nginx.exe所在的目录
            - index：默认页文件
        - error_page：配置错误页面
