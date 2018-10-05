---
title: CSS中的单位
date: 2018-04-10 11:57:31
tags: CSS
---
在css中常用的单位就几个（`px`、`%`、`rem`、`s`、`deg`），其实css/css3中还有很多单位可用。
### 长度
单位 | 解释
---- | ----
px | 相对于屏幕分辨率而不是视窗大小：通常为1个点或1/72英寸
em | 相对于父元素的字体大小
rem | 相对于根元素字体大小
vw |	相对于视窗的宽度：视窗宽度是100vw
vh |	相对于视窗的高度：视窗高度是100vh
vm | 相对于视窗的宽度或高度，取决于哪个更小

<!-- more -->
ex | 相对于小写字母"x"的高度
ch	| 数字“0”的宽度
in	| inch, 英寸
cm	| centimeter, 厘米
mm	| millimeter, 毫米
pt	| 1/72英寸
pc	| 12点活字，或1/12点
%	| 相对于父元素。正常情况下是通过属性定义自身或其他元素


#### ex、ch
`ex`和`ch`，与`em`和`rem`相似，都依赖于`font-size`。然而，这两个单位还依赖于`font-family`，因为它们被定为基于特殊字体的法案。`ex`在CSS1中已经存在，所以兼容性很好，但`ch`的兼容性很差。

### 时间、频率、角度
单位 | 解释
---- | ----
deg	| degrees, 角度
grad |	grads, 百分度
rad	| radians, 弧度
turn |	turns, 圈数
ms	| milliseconds, 毫秒数
s	| seconds, 秒数
Hz	| Hertz, 赫兹
kHz	| kilohertz, 千赫

#### 角度(Degrees)
角度范围从0~360度(deg)，正数表示顺时针旋转，负数则逆时针。
```css
transform: rotate(365deg);
transform: rotate(5deg);
```

#### 百分度(Grads)
一个分度，或者说是百分度相对于1/400个整圆，跟角度单位一样，支持负值，负值表示逆时针方向。100gads相当于90deg。

#### 弧度(Rads)
1弧度等于180/π度，约等于57.3度。
