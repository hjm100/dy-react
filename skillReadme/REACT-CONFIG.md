
# my-react项目一步步搭建

## 使用create-react-app创建react项目

``` shell

npm install -g create-react-app

create-react-app my-app

cd my-app

npm run eject // 把默认配置全部暴露出来，便于自定义修改webpack的配置。

npm start

```

## 修改项目结构(细小的页面分支不在详情总结)

```
.
├── mock                            # 本地模拟数据
├── build                           # 项目打包文件
|   ├── jest                        # 测试脚本
|   ├── scripts                     # 打包命令脚本
│   └── utils                       # 打包工具库
├── config                          # 全局配置
│   └── settings.js                 # 配置文件，端口号，域名等
├── public                          
|   ├── favicon.ico                
|   ├── index.html                 
│   └── manifest.json               # 5+移动App的配置文件
├── src
|   ├── assets                      # 本地静态资源
│   ├── components                  # 项目通用通用组件
│   ├── router                      # 路由入口
│   ├── services                    # 服务封装
│   ├── views                       # 业务页面入口和常用模板
│   ├── utils                       # 工具库,公共js文件
│   ├── styles                      # 公共样式
│   ├── index.js                    # 应用入口
│   └── App.js                      # 路由入口
├── tests                           # 测试工具
├── skillReadme                     # 技术文档说明
├── .babelrc
├── .eslintrc.js
├── .gitignore
├── README.md
├── package-lock.json
└── package.json

注意：

1. 如果采用我这种目录结构，首先需要明白通过create-react-app创建项目的目录结构

2. 以上是我对与目录结构的调整（切记自带打包路径为build）

3. 下面总结架构优化对照表（只针对打包路径优化）

    优化前                  优化后
    scripts  -----------   build/scripts
    config   -----------   build
             -----------   build/utils (env/paths/polyfills)
4.  修改项目中的路径：(build,package.json) //可以做对比
```

## 修改webpack的配置以及打包配置

### 为什么要修改webpack配置

1. 我们想要自己配置端口号

2. 我们想要扩展打包插件 （如七牛）

3. 我们想要设置proxy

4. 我们想要配置cdn路径

### 更加巧妙的配置（配置文件一般放在config文件夹中【这就是我为什么把打包文件抽出来的原因】）

1. 我们新建一个settings.js配置文件（相关说明请访问settings.js）

``` js
// settings.js
module.exports = {
  port: 5100,       //端口号
  cdnPath: 'https://hjm100.cn', //cdn路径
  buildPath:'./dist',//打包路径
  qiniu: {  //七牛云配置
    ACCESS_KEY: '*************',
    SECRET_KEY: '*************',
    bucket: '****',
    path: '*****'
  },
  proxy: {    //proxy配置  表示会将/api下的所有请求转发到http://127.0.0.1:3100, 
    "/api": {
      "target": "http://127.0.0.1:3100",
      "changeOrigin": true,
    }
  }
}

```

1. 在start.js中配置端口号与加载proxy配置

```js
// 修改start.js文件的43行，将默认3000端口换成可配置端口
// const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000; //原代码
const settings = require('../../config/settings');
//配置端口号
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || settings.port;


// 修改start.js文件的76行(加载proxy配置)
// const proxySetting = require(paths.appPackageJson).proxy; //原代码
const proxySetting = settings.proxy;

```
1. 修改打包文件路径

```js
const settings = require('../../config/settings');
// 修改paths.js文件的44行，将默认打包路径换成可配置路径
// appBuild: resolveApp('build'),//原代码
appBuild: resolveApp(settings.buildPath),

```
1. 设置cdn路径与扩展打包插件

```js
const settings = require('../config/settings');
// 修改webpack.config.prod.js文件的18行，设置cdn
// const publicPath = paths.servedPath; //原代码
const publicPath = settings.cdnPath;
// 引入七牛云插件（将静态资源放到七牛）
// const QiniuPlugin = require('qiniu-webpack-plugin');
//在331行后面添加代码
new QiniuPlugin(settings.qiniu),

```

1. 添加babel-polyfill（处理es6）

```js

// 首先 通过npm 安装 babel-polyfill
// 测试：项目在ie11中运行正常
require.resolve('babel-polyfill'), //在webpack中引入babel-polyfill
//在webpack.config.dev.js与webpack.config.prod.js 中的entry数组中注入

//注意：你也可以不在webpack中引入，可以index 中通过 import 'babel-polyfill';   

```

1. 添加 sass-loader (编译.scss文件)

``` js

  // 通过npm 安装 sass-loader
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/,/.scss$/],
  // 在webpack.config.dev.js与webpack.config.prod.js 中的exclude数组中加入scss匹配项/.scss$/
  {
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
  },
// 在webpack.config.dev.js与webpack.config.prod.js 中的oneOf数组中注入

```
## 添加本地模拟数据调试 mock

1. mock详细用法稍后会给与总结 【请稍后】

1. 此处重在总结pm2 【（pm2详细）请查看[skillReadme/pm2]】

1. 使用pm2主要是解决同时启动两个进行中的服务（如果有更好的方法请留言）

```js

// pm2.json

{
  "apps": [
    {  //启动mock命令
      "name": "mock",
      "script": "mock/mock-server.js",
      "instances": 1, //开启一个进程
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "max_memory_restart": "500M",
      "exec_mode": "cluster",
      "env": {
        "NODE_ENV": "production"
      }
    },
    {  //启动start命令
      "name": "start",
      "script": "build/scripts/start.js",
      "instances": 1, //开启一个进程
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "max_memory_restart": "500M",
      "exec_mode": "cluster",
      "env": {
        "NODE_ENV": "production"
      }
    }
  ]
}

```

## 修改package.json的启动命令

```js

// 修改启动命令（此处该文件路径即可）
"scripts": {
    "start": "node build/scripts/start.js",
    "mock": "node mock/mock-server.js",
    "dev": "pm2 startOrRestart config/pm2.json",  // 命令行npm run dev 开启模拟数据调试模式
    "build": "node build/scripts/build.js",
    "test": "node build/scripts/test.js --env=jsdom"
},

//修改测试命令（此处该文件路径即可）

"setupFiles": [
    "<rootDir>/build/utils/polyfills.js"
],

"transform": {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/build/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/build/jest/fileTransform.js"
},

```

## 总结

1. 至此你的react环境基本上已经配置完毕了，如果有什么扩展请自行研究

1. 关于react知识点慢慢总结....



