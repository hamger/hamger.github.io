---
title: JS数组迭代
date: 2017-03-01 22:08:34
tags: JavaScript
---
ECMAScript5为数组定义了5个迭代方法，每个方法都接受两个参数：每一项上运行的函数，运行该函数的作用域对象（可选）。

* every() 若数组每一项都符合函数要求，返回true，否则返回false
* some() 若数组任意一项符合函数要求，返回true，否则返回false
* filter() 对数组每一项运行函数，返回符合函数要求的项组成的数组
* map() 对数组每一项运行函数，返回每次函数结果组成的数
* forEach() 对数组每一项运行函数，无返回值

<!-- more -->
实践出真知，以下代码是很好的例子

```js 
	var     numbers = [1,2,3,4,5,4,3,2,1]
	var everyResult = numbers.every(function (item,index,array) {
	    return (item > 2);
	})    

	console.log(everyResult); //false 

	var someResult = numbers.some(function (item,index,array) {
	    return (item>2);
	})

	console.log(someResult); //true 

	var filterResult = numbers.filter(function (item,index,array) {
	    return (item > 2);
	}) 

	console.log(filterResult); //[3,4,5,4,3]

	var mapResult = numbers.map(function (item,index,array) 	{
	    return item*2;
	})

	console.log(mapResult); //[2,4,6,8,10,8,6,4,2]

	numbers.forEach(function (item,index,array) {
	     console.log(item) //依次输出数组的每一项
	})
```