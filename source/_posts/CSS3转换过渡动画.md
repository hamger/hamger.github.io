---
title: CSS3转换过渡动画
date: 2017-03-01 15:25:02
tags: CSS3
---
CSS3中有三个属性：transform、transition、animation，一直容易搞混，今天特意拎出来理一理。
## transform 转换
transform 能够对元素进行移动、缩放、转动、拉长或拉伸。transform 分为2D转换和3D转换，由于目前浏览器对3D转换的支持度还不好，所以以下主要讲解2D转换。

### 2D转换方法
* translate(x,y) 移动，参数为像素值 
	* translateX(n)
	* translateY(n)
* rotate(angle) 转动，参数为角度
* scale(x,y) 缩放，参数为倍数
	* scaleX(n)
	* scaleY(n)
<!-- more -->
* skew(x-angle,y-angle) 倾斜，参数为角度
	* skewX(angle) 
	* skewY(angle) 
* matrix() 参数为六个值的矩阵，可以描述以上所有转换，用于复杂的转换

### transform-origin
另外，还有一个transform-origin属性，用来改变被转换元素的位置，一般和rotate()配合使用。
```css
div
{
transform: rotate(45deg);
transform-origin:20% 40%;

-ms-transform: rotate(45deg); 		/* IE 9 */
-ms-transform-origin:20% 40%; 		/* IE 9 */

-webkit-transform: rotate(45deg);	/* Safari 和 Chrome */
-webkit-transform-origin:20% 40%;	/* Safari 和 Chrome */

-moz-transform: rotate(45deg);		/* Firefox */
-moz-transform-origin:20% 40%;		/* Firefox */

-o-transform: rotate(45deg);		/* Opera */
-o-transform-origin:20% 40%;		/* Opera */
}
```
transform-origin的参数可以为：left、right、center、length、% 。

## transition 过渡
该属性和 :hover 配合使用，实现鼠标移入动画效果。
要实现过渡，必须规定两项内容：
* 规定您希望把效果添加到哪个 CSS 属性上
* 规定效果的时长

### 过渡属性

 属性                         | 描述                                    
 ---------------------------- | ----------------------------------------
 transition                   | 简写属性，在一个属性中设置四个过渡属性。
 transition-property          | 规定应用过渡的 CSS 属性的名称。         
 transition-duration          | 定义过渡效果花费的时间。默认是 0。        
 transition-timing-function   | 规定过渡效果的时间曲线。默认是 "ease"。   
 transition-delay             | 规定过渡效果何时开始。默认是 0。          

### 实例
```css
div
{
width:100px;
height:100px;
background:yellow;
transition-property:width 1s linear 2s;
/* Firefox 4 */
-moz-transition:width 1s linear 2s;
/* Safari and Chrome */
-webkit-transition:width 1s linear 2s;
/* Opera */
-o-transition:width 1s linear 2s;
}

div:hover
{
width:200px;
}
```

## animation 动画 
该属性和 @keyframes 配合使用。

### @keyframes
@keyframes 规则用于创建动画。在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。
```css
@keyframes myfirst
{
from {background: red;}
to {background: yellow;}
}

@-moz-keyframes myfirst /* Firefox */
{
from {background: red;}
to {background: yellow;}
}

@-webkit-keyframes myfirst /* Safari 和 Chrome */
{
from {background: red;}
to {background: yellow;}
}

@-o-keyframes myfirst /* Opera */
{
from {background: red;}
to {background: yellow;}
}
```
@keyframes中也可以用具体的百分比
```css
@keyframes myfirst
{
0%   {background: red;}
25%  {background: yellow;}
50%  {background: blue;}
100% {background: green;}
}
```
在 @keyframes 中创建动画，把它捆绑到某个选择器，否则不会产生动画效果。
通过规定至少以下两项 CSS3 动画属性，即可将动画绑定到选择器：
* 规定动画的名称
* 规定动画的时长
```css
div
{
animation: myfirst 5s;
-moz-animation: myfirst 5s;	/* Firefox */
-webkit-animation: myfirst 5s;	/* Safari 和 Chrome */
-o-animation: myfirst 5s;	/* Opera */
}
```

### 动画属性
| 属性                         | 描述                                         | 
| ----------------------------:| --------------------------------------------:| 
| @keyframes                | 规定动画。     | 
| animation         | 所有动画属性的简写属性，除了 animation-play-state 属性。     | 
| animation-name          | 规定 @keyframes 动画的名称。         |   
| animation-duration   | 	规定动画完成一个周期所花费的秒或毫秒。默认是 0。    |   
| animation-timing-function            | 规定动画的速度曲线。默认是 "ease"。             |   
| animation-delay            | 规定动画何时开始。默认是 0。           |   
| animation-iteration-count          | 规定动画被播放的次数。默认是 1。             |   
| animation-direction          | 	规定动画是否在下一周期逆向地播放。默认是 "normal"。    |  
| animation-play-state           | 	规定动画是否正在运行或暂停。默认是 "running"。          | 
| animation-fill-mode           | 规定对象动画时间之外的状态。           |   