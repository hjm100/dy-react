module.exports = {
  port: 8888,       //端口号
  cdnPath: './', //cdn路径(存放静态资源)
  buildPath:'./dist',//打包路径
  qiniu: {  //七牛云配置
    ACCESS_KEY: '*******************',
    SECRET_KEY: '*******************',
    bucket: '************',
    path: '******'
  },
  proxy: {    //proxy配置  表示会将/api下的所有请求转发到http://127.0.0.1:3100, 
    "/api": {
      "target": "http://127.0.0.1:6666",
      "changeOrigin": true,
    }
  }
}