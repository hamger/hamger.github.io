---
title: sass语法基础
date: 2018-02-11 21:11:29
tags: sass
---
### Variables
`sass`定义变量符号是`$`，`less`定义变量的符号是`@`。
```scss
$bule: #2a8ee3 !global; // 全局变量
$borderDirection: top !default; // 默认值
$baseFontSize: 12px;
$baseLineHeight: 1.5;
.border-#{$borderDirection}{
  border-#{$borderDirection}:1px solid #ccc;
}
body{
    font:#{$baseFontSize}/#{$baseLineHeight};
}
```
```scss
$linkColor: #08c #333 !default;//第一个值为默认值，第二个鼠标滑过值
a{
  color:nth($linkColor,1);
  &:hover{
    color:nth($linkColor,2);
  }
}
```
```scss
//sass style
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}

//css style
h1 {
  font-size: 2em; 
}
h2 {
  font-size: 1.5em; 
}
h3 {
  font-size: 1.2em; 
}
```

<!-- more -->
### Mixins
```scss
@mixin border-radius($radius: 5px) {
  border-radius: $radius;
}
.box { @include border-radius(10px); }
```

### Extend
```scss
// %定义占位符选择器，不调用则不会有任何多余的css文件
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}
```

### Function
```scss
$baseFontSize:      10px;
$gray:              #ccc;        
@function pxToRem($px) {
  @return $px / $baseFontSize * 1rem;
}
body{
  font-size:$baseFontSize;
  color:lighten($gray,10%); // 颜色减淡 10%
}
.test{
  font-size:pxToRem(16px);
  color:darken($gray,10%); // 颜色加深 10%
}
```

### Import
```scss
@import 'reset'; // 导入 reset.scss
```
