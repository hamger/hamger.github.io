---
title: Vue中引用图片地址
date: 2018-02-17 20:32:18
tags: Vue.js
---
```
<template>
	<div>
		<img src="../../uploads/1-headimg.jpg">
	</div>
</template>
```
以上写法合理的，但是以下写法就会报错
<!-- more -->
```
<img :src="headimg">
...
data () {
	return {
	  headimg: '../../uploads/1-headimg.jpg'
	}
},
```
这是因为放在模版里的图片地址是会被`webpack`打包出来，所以不会报错；而`js`里的图片地址只是字符串，`webpack`不会处理。如果想这么做，可以把图片放在最外层的`static`文件夹，或使用`import` `require`引入。
```
data () {
	return {
	  headimg: require('../../uploads/1-headimg.jpg')
	}
},
```
```
import headimg from '../../uploads/1-headimg.jpg'
...
data () {
	return {
	  headimg: headimg
	}
},
```
更简单的还可以这样写
```
<img :src="require('../../uploads/1-headimg.jpg')">
```

### 注意
**`require`不接受变量为参数，只接受直接字符串！字符串中带有变量也不行！**
举个栗子，`xx`是一个变量，以下写法是非法的
```
<img :src="require(xx)"> 
```
合理写法应该是
```
<img :src="xx"> 
```