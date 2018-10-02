---
title: Bootstrap栅格布局原理
date: 2017-03-11 17:46:12
tags: Bootstrap
---
今天有个电话面试问到 Bootstrap 栅格布局的原理，当时没答出来，之后百度了下，发现这个问题我应该答出来的。
实现列组合方式非常简单，只涉及两个CSS两个特性：浮动与宽度百分比。
```css
.col-md-1, .col-md-2,... .col-md-11, .col-md-12 {
    float: left;
 }
```
```css
  .col-md-12 {
    width: 100%;
  }
  .col-md-11 {
    width: 91.66666667%;
  }
	...
  .col-md-2 {
    width: 16.66666667%;
  }
  .col-md-1 {
    width: 8.33333333%;
  }
```
<!-- more -->
列偏移是通过设置 margin-left 百分比值来实现的。
```css
  .col-md-offset-12 {
   margin-left: 100%;
}
  .col-md-offset-11 {
    margin-left: 91.66666667%;
  }
	...
  .col-md-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-md-offset-0 {
    margin-left: 0;
  }
```