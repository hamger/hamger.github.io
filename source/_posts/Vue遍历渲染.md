---
title: Vue遍历渲染
date: 2018-03-29 21:24:10
tags: Vue.js
---
Vue 中要遍历 n 项可以这么写
```
<div v-for="i in n">{{i}}</div>
<div v-for="i in new Array(n)">{{i}}</div>
```
遍历数组
```
<div v-for="(item, index)in array">
  {{ item }} - {{ index }}
</div>
```
遍历对象，遍历顺序就是对象书写顺序
```
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>
```
<!-- more -->
### v-for 和 v-if
当它们处于同一节点，`v-for`的优先级比`v-if`**更高**，这意味着`v-if`将分别重复运行于每个`v-for`循环中。所以下面代码在`arr.length > 2`的情况下会报错`RangeError: Invalid array length`:
```
<div v-if="arr.length < 2"
  v-for="item in (2 - arr.length)">
</div>
```
这是因为**负数**不能遍历，即使有`v-if`的限制也会报错！
可以修改为
```
<div v-if="arr.length < 2"
  v-for="item in Math.abs(2 - arr.length)">
</div>
```
如果你的目的是有条件地跳过循环的执行，那么可以将`v-if`置于**外层元素** (或 `<template>`)上。

### v-for on a <template>
类似于`v-if`，你也可以利用带有`v-for`的`<template>`渲染多个元素。
```
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
  </template>
</ul>
```

### key
官方建议尽可能在使用`v-for`时提供`key`，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。
```
<div v-for="item in items" :key="item.id"></div>
```
