---
title: div居中
date: 2017-03-09 11:32:35
tags: CSS
---
## 水平居中

### 定宽水平居中
给div设置一个宽度，然后添加margin:0 auto属性。
```css
div{
    width:200px;
    margin:0 auto;
}
```

### 不定宽水平居中
设置 display:table ，这个样式会告知浏览器当前元素的宽度，采用最小的宽度，不是默认全宽。
```css
div {
	display:table;
	margin:0 auto;
}
```
<!-- more -->

## 水平垂直居中 

### 居中一
```css
div {
    position: absolute;
    width: 300px;
    height: 300px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: pink;   	/* 方便看效果 */
}
```

### 居中二
```css
div {
    position: relative;     /* 相对定位或绝对定位均可 */
    width:500px;
    height:300px;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -250px;      /* 外边距为自身宽高的一半 */
    background-color: pink;   
 }
```

### 居中三 
未知容器的宽高，利用 `transform` 属性
```css
div {
    position: absolute;     /* 相对定位或绝对定位均可 */
    width:500px;
    height:300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: pink;  
}
```

### 居中四
利用 flex 布局，实际使用时应考虑兼容性。
```css
.container {
    display: flex;
    align-items: center;        /* 垂直居中 */
    justify-content: center;    /* 水平居中 */

}
.container div {
    width: 100px;
    height: 100px;
    background-color: pink; 
}
```

