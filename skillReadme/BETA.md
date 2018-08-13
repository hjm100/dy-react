# beta环境（使用node搭建H5 history模式测试环境）

## 什么是beta环境

1. beta环境为开发者本地模拟线上环境，针对vue,react,angular这种单页面应用

1. 最终前端的运行代码，大多都是打包发布的（一般在dist文件中）

1. 我们怎么能够确保打包后的文件能够正常运行那，所以就搭建一个本地的服务来测试

## beta环境需要客服的两大难题

1. 我们的服务采用node:  express + http-proxy-middleware

### 解决服务跨域 (PROXY.md文件)

```js

// 转发跨域请求
Object.keys(proxyConfig).forEach(function (key) {
  let proxy = proxyConfig[key]
  // 如果 proxy配置是字符串 (直接为一个链接的话我们要将其封装成对象)  
  if (typeof proxy === 'string') {
    proxy = { target: proxy }
  }
  // key 为路径 '/api'  [详细请查看PROXY.md]
  app.use(proxyMiddleware(key, proxy))
})

```

### 解决路由跳转（我们大多使用的是H5的history模式）

```js
// 处理history路由
app.use(require('connect-history-api-fallback')())

```

## beta-serve.js完整代码

```js
// beta-serve.js
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')

const settings = require('../../config/settings')
const proxyConfig = settings.proxy;

const app = express()

// 处理history路由
app.use(require('connect-history-api-fallback')())

// 转发跨域请求
Object.keys(proxyConfig).forEach(function (key) {
  let proxy = proxyConfig[key]
  // 如果 proxy配置是字符串 (直接为一个链接的话我们要将其封装成对象)  
  if (typeof proxy === 'string') {
    proxy = { target: proxy }
  }
  // key 为路径 '/api'  [详细请查看PROXY.md]
  app.use(proxyMiddleware(key, proxy))
})

// 静态资源路径
app.use('/', express.static(settings.buildPath))

// 监听端口
module.exports = app.listen(8080, function (err) {
  if (err)console.log(err)
  else console.log('beat测试运行在http://localhost:8080上')
})

```

## 配置pm2 (PM2.md)

```js
// beta_pm2.json
{
    "apps": [{
        "name": "beta",
        "script": "build/scripts/beta.js",
        "instances": 1,
        "log_date_format": "YYYY-MM-DD HH:mm Z",
        "max_memory_restart": "500M",
        "exec_mode": "fork",
        "watch": [
            "dist"
        ],
        "env": {
            "NODE_ENV": "production"
        }
        }
    ]
}
```

## 添加运行命令

```js

//在package.json的"scripts":{}中添加运行脚本

"beta": "pm2 startOrRestart config/beta_pm2.json"

```

## 至此你已经完成了beta环境的搭建

1. 当遇到一个问题需要解决的时候，要先想好你想要解决的是什么问题

2. 再去分析问题需要怎么解决