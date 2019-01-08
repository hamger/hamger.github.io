---
title: margin负值
date: 2017-03-12 09:54:18
tags: CSS
---
margin 为负值是符合 W3C 标准的，完全没有兼容性问题，另外需要一提的是 padding 和 border 不支持负值。存在就是有意义的，那么负边距究竟有什么样的作用？ 

## 在普通文档流中的效果
那些没有脱离文档流的元素，其在页面中的位置是跟随者文档流的变化而变化的。看下面这幅图：
![未设置负边距的文档流](http://images.cnblogs.com/cnblogs_com/2050/201208/201208131525098932.png)
现在我们把上图中的块状元素、行内元素以及inline-block元素都设一个负边距 margin:-10px; 看看会发生什么：
![设置负边距的文档流](http://images.cnblogs.com/cnblogs_com/2050/201208/201208131525134914.png)
注意到根据文档流的渲染顺序，前面的元素的会被后面的元素覆盖10px，另外顶部的块状元素也向上隐藏了10px。
由此可知，在文档流中，元素的最终边界是由margin决定的，margin为负的时候就相当于元素的边界向里收，文档流只认这个边界，不会管元素的实际尺寸是多少。
<!-- more -->

## 对元素宽度的影响
如果一个元素未设置宽度(或者width:auto)，负边距能增加元素的宽度。
比如下图的黑灰色部分是一个块状元素，它没有设定宽度。它被包裹在一个宽度为400px,且水平居中的父元素中。
![未设置宽度](http://images.cnblogs.com/cnblogs_com/2050/201208/20120813152515780.png)
现在给这个元素的设一个 margin-right:-100px;
![设置负边距](http://images.cnblogs.com/cnblogs_com/2050/201208/201208131525179959.png)

## 对浮动和绝对定位元素的影响
浮动元素或者绝对定位的元素会根据元素的边界来定位，而这个边界是由 margin 值来决定的，因此 margin 值的改变会影响元素的位置。

### 浮动定位
利用浮动元素的负边距，可以实现将写在后面的某个元素前置显示。
```html
    <style>
    .ul > div {
    	width: 300px;
        height: 300px;
        float: left;
    }
    .li1 {       
        background-color: #B7FF7C;       
    }    
    .li2 {
        background-color: #F9715F;
    }    
    .li3 {
        background-color: #83F2FB;
        margin-left: -450px;
    }
    </style>
  	<div class="ul">
        <div class="li1">list1</div>
        <div class="li2">list2</div>
        <div class="li3">list3</div>
    </div>
```

### 绝对定位
绝对定位的元素定义的top、right、bottom、left等值是元素自身的边界到最近的已定位的祖先元素的距离，这个元素自身的边界指的就是 margin 定义的边界，如果margin为负则它的边界是向里收的。利用这点，就有了经典的利用绝对定位来居中的方法。
```css
div {
    position: relative;  
    width:500px;
    height:300px;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -250px; /* 外边距为自身宽高的一半 */
    background-color: pink;   
 }
```

## 实际应用
### 两栏等高布局
```html
    <style>
    .box {
        overflow: hidden;
    }
    
    .list1,
    .list2 {
        width: 300px;
        float: left;
        margin-bottom: -1000px;
        padding-bottom: 1000px;
    }
    
    .list1 {
        background-color: #B7FF7C;
    }
    
    .list2 {
        background-color: #F9715F;
    }
    </style>
    <div class="box">
        <div class="list1">
            <p>左列</p>
            <p>左列</p>
            <p>左列</p>
        </div>
        <div class="list2">
            <p>右列</p>
            <p>右列</p>
        </div>
    </div>
```

### 列表去边 
```html
    <style>
    .box {
        width: 1200px;
        margin: auto;
        background-color: #FEB91E;
    }
    
    .ul {
        overflow: hidden;
        margin-right: -20px; // 增大了容器宽度
    }
    
    .li {
        width: 386.66px; // 计算后的宽度
        height: 300px;
        margin-right: 20px;
        background-color: #B7FF7C;
        float: left;
    }
    </style>
    <div class="box">
    	<div class="ul">
    		<div class="li">list1</div>
    		<div class="li">list2</div>
    		<div class="li">list3</div>
    	</div>
    </div>
```