---
title: 'null,undefined'
date: 2017-03-09 15:32:24
tags: JavaScript
---
### 相似性
变量分别被赋值为undefined和null，这两种写法几乎等价。
undefined和null在if语句中，都会被自动转为false，相等运算符甚至直接报告两者相等。

### 区别
> null:  表示一个对象的值为空
> undefined:  表示一个变量声明了但没有被赋值

<!-- more -->
```js
typeof undefined //"undefined"
typeof null //"object"
```
**注意**：在验证null时，一定要使用`===`，因为`==`无法区别 null 和 undefined
```js
null == undefined // true
null === undefined // false
```
### 应用
null 表示"没有对象"，即该处不应该有值。典型用法是：
* 作为函数的参数，表示该函数的参数不是对象
* 作为对象原型链的终点

undefined 表示"缺少值"，就是此处应该有一个值，但还没有被赋值。典型用法是：
* 变量被声明了，但没有赋值时，就等于undefined
* 调用函数时，应该提供的参数没有提供，该参数等于undefined
* 对象没有赋值的属性，该属性的值为undefined
* 函数没有返回值时，默认返回undefined
