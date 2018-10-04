---
title: 实现bind函数
date: 2018-04-11 08:15:05
tags: JavaScript
---
```js
var name = 'window';
var test = function(){
    console.log(this.name)
}
test() // window
var obj = {
    name: 'obj',
    test: test
}
obj.test() // obj
```
设计一个`customBind`函数，使其满足如下效果：
```js
var obj = {
    name: 'obj',
    test: test.customBind(window)
}
obj.test() // window
```
<!-- more	 -->
很明显`customBind`函数需要改变this的指向，所以需要用到`call`或`apply`方法
```js
Function.prototype.customBind = function(that) {
	var _this = this, // _this 指向当前被调用的函数
	slice = Array.prototype.slice,
    args = slice.call(arguments, 1); // 将customBind函数的参数转化为数组
	return function () {
		return _this.apply(that, args);
	}
};
```
以上代码可以实现作用域绑定，但是无法支持调用函数的参数传递，也就是说`obj.test('obj2')`里传递的参数不会被处理，因此我们需要改进一下`customBind`函数：
```js
Function.prototype.customBind = function(that) {
	var _this = this, // _this 指向当前被调用的函数
	slice = Array.prototype.slice,
    args = slice.call(arguments, 1); // args 是 customBind 函数的参数
	return function () {
		// slice.call(arguments, 0) 是被调用函数的参数
		return _this.apply(that, args.concat(slice.call(arguments, 0)));
	}
};
```
测试
```js
var name = 'window';
var test = function(a, b) {
    console.log('作用域绑定：' + this.name);
    console.log('customBind传递的参数：' + a);
    console.log('调用函数传递的参数：' + b);
}
var obj = {
    name: 'obj',
    test: test.customBind(window, 'obj')
}
obj.test('obj2')
// 作用域绑定： window
// customBind传递的参数：obj
// 调用函数传递的参数：obj2
```
测试通过，所以js中的bind函数可以这样实现：
```js
Function.prototype.bind = function(that) {
	var _this = this, slice = Array.prototype.slice, args = slice.call(arguments, 1);
	return function () {
		return _this.apply(that, args.concat(slice.call(arguments, 0)));
	}
};
```
