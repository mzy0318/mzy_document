---
title: 虚拟主机
---

# 虚拟主机

## 多虚拟主机配置
`listen`与`server_name`组合必须具有唯一性

常用配置方式
1. 同`listen`不同`server_name`;
```nginx
server {
    listen       80;
    server_name  doc.msgyj.cn;
    location / {
        root   D:\soft\www\home;
        index  index.html index.htm;
    }
}
...
server {
    listen       80;
    server_name  zikao.msgyj.cn;
    location / {
        root   D:\soft\www\video;
        index  index.html index.htm;
    }
}
```
2. 同`server_name`不同`listen`;
```nginx
server {
    listen       80;
    server_name  localhost;
    location / {
        root   D:\soft\www\home;
        index  index.html index.htm;
    }
}
...
server {
    listen       8080;
    server_name  localhost;
    location / {
        root   D:\soft\www\video;
        index  index.html index.htm;
    }
}
```

## server_name配置规则
多个虚拟主机匹配规则，如果匹配到其中一个虚拟主机，则之后的虚拟主机就不会进行匹配。

### 匹配多域名配置
server_name可以配置多个域名，中间使用空格隔开
```nginx
server {
    listen       80;
    server_name  doc.msgyj.cn zikao.msgyj.cn;
    location / {
        root   D:\soft\www\home;
        index  index.html index.htm;
    }
}
```

### 前置通配符匹配
可以使用通配符`*`实现多个域名

```nginx
server {
    listen       80;
    server_name  *.msgyj.cn;
    location / {
        root   D:\soft\www\home;
        index  index.html index.htm;
    }
}
```

### 后置通配符匹配

```nginx
server {
    listen       80;
    server_name  www.msgyj.*;
    location / {
        root   D:\soft\www\home;
        index  index.html index.htm;
    }
}
```

### 正则匹配

```nginx
server {
    listen       80;
    server_name  ~^[0-9]+\.msgyj\.cn$;
    location / {
        root   D:\soft\www\home;
        index  index.html index.htm;
    }
}
```

## 应用实例原理 
- 短网址：类似于`msgyj.com/kjfkjdjfkjd`
- httpdns：基于`http协议`的`动态dns服务器`，通常用于`C/S架构`