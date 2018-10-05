---
title: less语法基础
date: 2018-02-11 21:11:43
tags: less
---
### Variables
`less`定义变量的符号是`@`，`sass`定义变量符号是`$`。
```less
@images: "../img";
body {
  color: #444;
  background: url("@{images}/white-sand.png");
}
@property: color;
.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
@mySelector: banner;
.@{mySelector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

<!-- more -->

### Mixins
`less`的`mixin`比`sass`更简洁。  
```less
.a, #b {color: red;}
.mixin-class {
  .a; // 等价于 .a();
}
.mixin-id {
  #b();
}
```
```less
.my-mixin { // 会输出在 css 中
  color: black;
}
.my-other-mixin() { // 不会输出在 css 中
  background: white;
}
.class {
  .my-mixin;
  .my-other-mixin;
}
```
```less
.border-radius(@radius: 5px) {
  border-radius: @radius;
}

.mixin() {
  @width:  100%;
  @height: 200px;
}
.caller {
  .mixin();
  width:  @width;
  height: @height;
}
```

### Extend
```less
.a:extend(.b) {}
// the above block does the same thing as the below block
.a {
  &:extend(.b);
}

.e:extend(.f) {}
.e:extend(.g) {}
// the above an the below do the same thing
.e:extend(.f, .g) {}
```

### Import
```less
@import 'reset'; // reset.less
```