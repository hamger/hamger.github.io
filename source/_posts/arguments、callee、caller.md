---
title: arguments、callee、caller
date: 2017-03-03 14:25:33
tags: JavaScript
---
## arguments
arguments 是函数调用时，创建的一个伪数组，它存储实际传递给函数的参数。
arguments 是一个对象，它有两个常用的属性：length 、callee 。
需要注意的是 arguments 并不局限于函数声明的参数列表，举例如下
```js
function obj(){
   console.log( 'arguments instanceof Array? ' + (arguments instanceof Array) ); // false
   console.log( 'arguments instanceof Object? ' + (arguments instanceof Object) ); // true
   console.log(arguments); // 3
}
obj('monkey','love',24);
```
<!-- more -->

## callee 
callee 是 arguments 对象的一个成员，它的值为“正被执行的Function对象”。
arguments.callee 在哪一个函数中运行，它就代表哪一个函数。 一般用在匿名函数中。
在匿名函数中有时会需要自己调用自己，但是由于是匿名函数，没有名子，无名可调。
这时就可以用arguments.callee来代替匿名的函数。
```js
(function(n){
	if(n > 1) return n* arguments.callee(n-1);
	return n;
})(10);
```
上述代码用匿名函数实现的计算10的阶乘。用arguments.calle代替匿名函数。

## caller
caller 是函数对象的一个属性，该属性保存着调用当前函数的函数。包含闭包，如果没有父函数，则为null。
```js
//child是parent内的函数，并在parent内执行child
function parent(){
   	function child(){  
       	console.log( child.caller );
   	}
   	child();
}
//parent1没有被别人调用
function parent1(){  //这里parent1没有父函数
   console.log(parent1.caller);
}
//parent2调用了child2
function parent2(){
   	child2();
}
function child2(){
	 console.log(child2.caller);
}
/*执行
parent里嵌套了child函数
parent1没有嵌套函数
parent2调用了child2，child2不是嵌套在parent2里的函数
*/
parent();
parent1();
parent2();
```
在控制台会得到如图结果
![结果](http://images2015.cnblogs.com/blog/887360/201603/887360-20160315192829271-1814708938.png)

