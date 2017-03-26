---
title: CSS选择器优先级与效率
date: 2017-03-15 22:51:18
tags: CSS
---
## 各类选择器的优先级
1. important声明 1000
2. ID选择器 100
3. 类选择器 10
4. 伪类选择器 10
5. 属性选择器 10
6. 标签选择器 1
7. 伪元素选择器 1
8. 通配符选择器 0

属性选择器 = 伪类选择器
```css
a[src^="https"] { color: green; }
:last-child { color: red; }
```
伪类选择器 > 相邻选择器
```css
:last-child { color: green; }
p~ul { color: blue; }
```
相邻选择器 = 子选择器 = 后代选择器
```css
p~ul { color: red; }
body > p { color: green; }
body p { color: blue; }
```
后代选择器 > 标签选择器
```css
body p { color: blue; }
p { color: green; }
```
<!-- more -->

### 补充
* `<style></style>` 同 `<link />` 同级，应用取决于`<style>`标签和`<link />` 标签的先后顺序
* 元素`style=""`属性的优先级高于以上两种样式
* `!important` 优先级高于以上两种样式
* `!important` 在IE6中的BUG：在同一组CSS属性中, !important不起作用。
```
#selector{color:blue !important;color:green;}
```

## 选择器效率
1. ID选择器
2. 类选择器
3. 标签选择器
4. 相邻选择器
5. 子选择器
6. 后代选择器
7. 通配符选择器
8. 属性选择器
9. 伪类选择器

** 优先级高不一定效率高 ** 
