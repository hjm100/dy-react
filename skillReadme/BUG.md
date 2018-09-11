# BUG收集

## <a>标签不能嵌套<a>

1. 场景：<a><a>你好</a></a> 这种标签结构控制台会报错（但是程序能够正常运行）

1. 解决方法：改变标签结构使用 点击事件进行操作

## 高德地图引入

1. 需要在index.html全局引入高德地图

2. 在使用的页面中需要使用 window.AMap;

## css文件中图片引入不显示

1. 在js中通过require引入图片资源

```html
<div style={{backgroundImage:`url(${require('../../assets/activity/BagWheel/background.png')})`}}></div>
```
2. 在css中调整背景样式

```css
div{
    /* 也可以在此引入图片带有域名的真实路径，静态资源托管cdn */
    /* background-image:url('https://hjm100.cn/images/g2.jpg'); */
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
```