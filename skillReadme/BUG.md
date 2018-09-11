# BUG收集

## <a>标签不能嵌套<a>

1. 场景：<a><a>你好</a></a> 这种标签结构控制台会报错（但是程序能够正常运行）

1. 解决方法：改变标签结构使用 点击事件进行操作

## 高德地图引入

1. 需要在index.html全局引入高德地图

2. 在使用的页面中需要使用 window.AMap;

## react项目中css文件中背景图片不显示

### 场景

1. 在react项目中使用js与css单独分开编写页面

2. 在设置背景图片的时候(在css中引入本地图片)发现图片不显示

### 原因

1. 打包后的图片路径不正确(为跟随打包的层级变化)

### 解决方法

1. 使用cdn,引入带有域名可以在网页上访问的图片路径（cdn法）

``` css

    div{
        background-image: url('../../../assets/activity/BagWheel/title.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

```

2. 在js中使用require 代码如下

```html
<!-- 这里用来引入背景图片 -->
<div style={{backgroundImage:`url(${require('../../assets/activity/BagWheel/background.png')})`}}></div>

```

```css

div{
    /* 这里用来修饰背景 */
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

```