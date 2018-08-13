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

// 设置系统环境变量
// if (process.env.NODE_ENV === 'production') {
//   process.on('uncaughtException', function (err) {
//     sentry.captureError(err);
//   });
// }

// 监听端口
module.exports = app.listen(8080, function (err) {
  if (err)console.log(err)
  else console.log('beat测试运行在http://localhost:8080上')
})
