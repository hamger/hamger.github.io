---
title: SVG 图形
date: 2018-02-10 10:23:56
tags: SVG
---
SVG 意为可缩放矢量图形（Scalable Vector Graphics），SVG 使用 XML 格式定义图像。
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="140" height="140">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red" />
</svg>
```
SVG 代码在`<svg></svg>`内，这是根元素。`width`和`height`属性可设置此 SVG 文档的宽度和高度。`version`属性可定义所使用的 SVG 版本，`xmlns`属性可定义 SVG 命名空间。SVG 有一些预定义形状可以放在`<svg></svg>`里面。

**注意**！`cx` `cy` `r` `x` `y`等这些属性不要写在`style`属性里，会有兼容性问题。

<!-- more -->

### SVG 矩形 - `<rect>`
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect x="50" y="20" rx="20" ry="20" width="150" height="150"
  style="fill:red;stroke:black;stroke-width:5;opacity:0.5"/>
</svg>
```
属性 | 描述
--- | ---
height/width | 定义矩形高宽
fill | 定义矩形的填充颜色
stroke-width | 定义矩形边框的宽度
stroke | 定义矩形边框的颜色
x | 定义矩形的左侧位置
y | 定义矩形的顶端位置
fill-opacity | 定义填充颜色透明度（合法值：0~1）
stroke-opacity | 定义笔触颜色的透明度（合法值：0~1）
opacity | 定义整个元素的不透明度（合法值：0~1）
rx | 定义水平圆角大小
ry | 定义垂直圆角大小 

### SVG 圆形 - `<circle>`
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red"/>
</svg>
```
属性 | 描述
--- | ---
cx/cy | 定义圆点的x和y坐标，默认圆心(0, 0)
r | 定义圆的半径

### SVG 椭圆 - `<ellipse>`
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <ellipse cx="300" cy="80" rx="100" ry="50"
  style="fill:yellow;stroke:purple;stroke-width:2"/>
</svg>
```
属性 | 描述
--- | ---
cx/cy | 定义椭圆中心的x和y坐标
rx | 定义椭圆的水平半径
ry | 定义椭圆的垂直半径

### SVG 直线 - `<line>`
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="0" y1="0" x2="200" y2="200" 
  style="stroke:rgb(255,0,0);stroke-width:2"/>
</svg>
```
属性 | 描述
--- | ---
x1/y1 | 定义直线起点
x2/y2 | 定义直线终点

### SVG Stroke 属性
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black" stroke-width="4">
    <path stroke-dasharray="5,5" d="M5 20 l215 0" />
    <path stroke-dasharray="10,10" d="M5 40 l215 0" />
    <path stroke-dasharray="20,10,5,5,5,10" d="M5 60 l215 0" />
  </g>
</svg>
```
属性 | 描述
--- | ---
stroke | 定义描边颜色
stroke-width | 定义描边组粗
stroke-linecap | 定义开放路径头尾样式（butt、round、square）
stroke-dasharray | 用于创建虚线，第一个参数为划线长度，第二个是缺口长度，如此循环
