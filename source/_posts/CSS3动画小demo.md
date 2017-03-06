---
title: CSS3动画小demo
date: 2017-03-01 20:44:33
tags: CSS3
---
利用css3的动画属性可以实现很多有趣的动画效果。

## animation 循环动画
animation-iteration-count 属性设置为 infinite 可以使动画循环播放。

### loading效果
[demo1](/demo/loading.html)
定义一个垂直伸缩的 keyframes ，然后绑定在每个条子上，设置不同的animation-delay，就可以使每个条子运动起来，整体成波浪线运动。当网页中有需要等待的请求时，我们就可以插入这段动画，优化用户体验。
<!-- more -->

### 摆钟效果
[demo2](/demo/pendulum.html)
这个 demo 用到了 transform-origin 属性，将钟表和秒针的旋转中心设置在不同的地方，利用相对定位和绝对相对，使秒钟旋转中心根据钟表的位置定位，从而使钟表做钟摆运动的同时，秒钟做圆周运动。再将 animation-direction 属性值设为 alternate ，使钟表来回运动。

## transition 过渡动画
transition 属性和 :hover 联用实现酷炫的动态效果。

### 朦层效果 
[demo3](/demo/mask_hover.html)
鼠标移到图片上，边框旋转180度，显示朦层和字体，鼠标移出还原。朦层和字体在同一个 div 下，该 div 和边框 div 都设置 `position:absolute` ，最外层 div 设置 `position:relative` 。该效果可以用于图片信息的展示。

### 折角效果
[demo4](/demo/dog-ear_hover.html)
鼠标移到图片上，显示折角，点击折角图片消失显示按钮，点击小叉叉图片又动态地恢复。利用 before 伪类创建折角，初始 `border-width: 0;`，当鼠标移入时设置 `border-right-width: 80px;border-bottom-width: 80px;` ，为了使折角两边颜色不一样设置 `border-color: rgba(0, 0, 0, 0.2) #fff;`。该效果可用于图片的翻页。