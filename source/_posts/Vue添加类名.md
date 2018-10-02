---
title: Vue添加类名
date: 2018-03-01 18:22:12
tags: Vue.js
---
在vue中给元素添加类名非常灵活，主要分为三种形式。
### 对象的形式
```
<template>
  <div :class="{jd: true, jd2: false}"></div>
</template>
```

### 数组的形式
```
<div :class="['jd','jd2'}"></div>
```
注意数组中的类名需要加单引号，数组里也可以用对象，对象的键名如果是不带`-`的可以不加单引号。
```
<div :class="[{jd: true}, {'jd-2': true}, 'jd2'}"></div>
```
也可以在数组中使用三元表达式
```
<div :class="[
  (item.jd === '增发预案' || item.jd === '已经实施') ? 'jd' :
  (item.jd === '董事会预案' || item.jd === '审核通过') ? 'jd2' :
  (item.jd === '增发失败') ? 'jd3' : 'jd4'
]">{{item.jd}}</div>
```
<!-- more -->
### 函数的形式
```
<template>
  <div :class="getClass"></div>
</template>
<script>
  export default {
    method: {
      setClass () {
        return 'jd';
      }
    }
  }
</script>
```