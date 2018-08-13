# 使用 PROXY 进行服务转发

## node跨域转发 express+http-proxy-middleware

### 场景

1. 最近公司在尝试前后端分离的开发模式，

1. 要从中间拆除一个小的模块来做前后端分离

1. 只不过是流程和分工上的分离，不想在前端的机器上搭建一套java环境，

1. 就根据教程搭了一下转发，让本地可以接上开发服务器联调。

### 创建项目

1. npm init

1. 安装模块

1. npm install express connect-timeout http-proxy-middleware  --save-dev

1. 创建js文件

```js
// proxy-server.js

const express = require('express');
const timeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');
const app = express();

// 超时时间
const TIME_OUT = 30 * 1e3;

// 设置端口
app.set('port', '80');

// 设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

proxyOption = {
	target: 'http://localhost:8080',
	pathRewrite: {
        '^/api/' : '/'  // 重写请求，api/解析为/
    },
    changeOrigoin:true
};

// 静态资源路径
app.use('/', express.static('src/page'));

// 反向代理
app.use('/api/*', proxy(proxyOption));

// 监听端口
app.listen(app.get('port'), () => {
  console.log(`server running @${app.get('port')}`);
});
```