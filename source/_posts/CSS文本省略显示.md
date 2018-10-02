---
title: CSS文本省略显示
date: 2018-02-24 19:14:16
tags: CSS
---
当页面上有过多文字的时候，往往需要省略显示，CSS可以很方便的做到这点。

> 单行文本省略显示
```css
width: 68%; // 需要固定一个宽度
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```
> 多行文本省略显示(适用于WebKit浏览器和移动端)
```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2; // 设置需要显示的行数
overflow: hidden;
```