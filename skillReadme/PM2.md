# pm2使用心得

# pm2能够干什么

1. pm2是启动Nodejs服务常用到的工具。使用这个指令可以使node服务在后台运行（类似于linux的nohup）

1. 它们可以在服务因异常或其他原因被杀掉后进行自动重启。 

1. 由于Node的单线程特征，自动重启能很大程度上的提高它的健壮性。

## 基本指令

1. npm install pm2 -g ： 全局安装。

1. pm2 start app.js ： 启动服务，入口文件是app.js。

1. pm2 start app.js -i [n] --name [name] ： 启动n个进程，名字命名为name。

1. npm restart [name or id] ： 重启服务。

1. npm reload [name or id] ： 和rastart功能相同，但是可以实现0s的无缝衔接；如果有nginx的使用经验，可以对比nginx reload指令。

1. pm2 start app.js --max_memory_restart 1024M ： 当内存超过1024M时自动重启。 如果工程中有比较棘手的内存泄露问题，这个算是一个折中方案。

1. pm2 monit ： 对服务进行监控。

## 高级用法

### pm2支持配置文件启动：

2. pm2 ecosystem： 生成配置文件ecosystem.json

3. pm2 startOrRestart /file/path/ecosystem.json : 通过配置文件启动服务 (此项目重点是根据配置启动)

### ecosystem.json

```js
    /**
    * Application configuration section
    * http://pm2.keymetrics.io/docs/usage/application-declaration/
    * 多个服务，依次放到apps对应的数组里
    */
{
  "apps": [
      {
      "name": "mock",                               // 应用进程名称
      "script": "mock/mock-server.js",              // 启动脚本路径
      "instances": 1,                               // 启动的线程数量  开启两个线程 （max为最大线程）
      "log_date_format": "YYYY-MM-DD HH:mm Z",      // 指定日志日期格式
      "max_memory_restart": "500M",                 // 最大内存限制数，超出自动重启
      "exec_mode": "cluster",                       // 应用启动模式，支持fork和cluster模式
      "env": {                                      // 环境变量，object类型
        "NODE_ENV": "production"
      }
    },
    {
      "name": "start",
      "script": "build/scripts/start.js",
      "instances": 1,
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "max_memory_restart": "500M",
      "exec_mode": "cluster",
      "env": {
        "NODE_ENV": "production"
      }
    }
  ]
}

//注意：

// fork模式可以应用于其他语言，如php,python,perl,ruby,bash,coffee， 而cluster只能应用于node;
// fork不支持定时重启，cluster支持定时重启。
// 解决每次调试出现弹框的窘境：
// 如果只是本地调试，可以在本地调试的时候切到fork模式。
// 因为PM2 cluster模式用的是nodejs自己的cluster实现，弹窗这个是由nodejs本身的cluster实现导致的。
```

## 总结

### 服务进程数

1. 至于要启动几个进程，可以通过服务器的内核数进行确定，几个内核就启动几个服务。指令如下：

```js
  //查看物理CPU个数
  cat /proc/cpuinfo| grep "physical id" | sort| uniq | wc -l

  //查看每个物理CPU中core的个数(即核数)
  cat /proc/cpuinfo| grep "cpu cores"| uniq

  //查看逻辑CPU的个数
  cat /proc/cpuinfo| grep "processor"| wc -l
```
1. 当然可以启动多个端口，一个端口号对应一个服务，这样的话就需要nignx来做负载均衡了。

### 是否需要nginx

1. nginx可以做的事情主要有两个：

1. 反向代理，实现简单的负载均衡： 如果有多台服务器或者一台服务器多个端口，可以考虑用nginx。
2. 静态资源缓存：把一些静态资源（如静态页面，js等资源文件）放到nginx里，可以极大的提高服务的性能。

### 自动化部署

1. 通过shell脚本实现资源拉取、服务重启、nginx缓存更新等操作，再配合pm2的监控功能，就初步达到了一个后端工程部署的标配了。

## 注意
1. pm2启动后如果你想要关闭请执行以下操作

1. 先查找ID

1. pm2 status

1. 然后

1. pm2 stop id

1. pm2 delete id

```
说明:

apps:json结构，apps是一个数组，每一个数组成员就是对应一个pm2中运行的应用

name:应用程序名称

cwd:应用程序所在的目录

script:应用程序的脚本路径

log_date_format:

error_file:自定义应用程序的错误日志文件

out_file:自定义应用程序日志文件

pid_file:自定义应用程序的pid文件

instances:启动的线程数量

min_uptime:最小运行时间，这里设置的是60s即如果应用程序在60s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量

max_restarts:设置应用程序异常退出重启的次数，默认15次（从0开始计数）

cron_restart:定时启动，解决重启能解决的问题

watch:是否启用监控模式，默认是false。如果设置成true，当应用程序变动时，pm2会自动重载。这里也可以设置你要监控的文件。

merge_logs:

exec_interpreter:应用程序的脚本类型，默认是nodejs

exec_mode:应用程序启动模式，默认是fork

autorestart:启用/禁用应用程序崩溃或退出时自动重启

vizion:启用/禁用vizion特性(版本控制)

```