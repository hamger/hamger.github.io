---
title: this指向
date: 2020-09-02 12:44:56
tags: JavaScript
---
关于 this 指向，部分情况要区分严格模式和非严格模式（正常模式）：

* 作为普通函数调用：严格模式下，this的值是 undefined，非严格模式下，this指向全局对象。
* 作为方法调用：this指向所属对象。
* 作为构造函数调用：this指向实例化的对象。
* 通过call, apply, bind调用：如果指定了第一个参数thisArg，this的值就是thisArg的值（如果是原始值，会包装为对象）；如果不传thisArg，要判断严格模式，严格模式下this是undefined，非严格模式下this指向全局对象。

<!-- more -->

> 严格模式通过在脚本或函数的头部添加 `"use strict";` 表达式来声明。[严格模式和非严格模式的区别](https://segmentfault.com/a/1190000015798019)

### 案例一

```js
var num = 1;
var obj = {
    num: 2,
    add: function() {
        this.num = 3;
        // 这里的立即指向函数，因为我们没有手动去指定它的this指向，所以都会指向window
        (function() {
            // 所有这个 this.num 就等于 window.num
            console.log(this.num); // **严格模式下此行报错**
            this.num = 4;
        })();
        console.log(this.num);
    },
    sub: function() {
        console.log(this.num) // **严格模式下此行报错**
    }
}
/**
 * 在通过obj.add 调用add 函数时，函数的this指向的是obj,这时候第一个this.num=3
 * 相当于 obj.num = 3 但是里面的立即指向函数this依然是window,
 * 所以 立即执行函数里面console.log(this.num)输出1，同时 window.num = 4
 * 立即执行函数之后，再输出`this.num`,这时候`this`是`obj`,所以输出3
 */
obj.add() // 输出 1 3

// 通过上面`obj.add`的执行，obj.name 已经变成了3
console.log(obj.num) // 输出3
console.log(num) // 输出4
// 如果将obj.sub 赋值给一个新的变量，那么这个函数的作用域将会变成新变量的作用域
const sub = obj.sub
// 作用域变成了window 
sub() // 输出4
```
非严格模式下输出：`1`、`3`、`3`、`4`、`4`

严模式下报错：`Cannot read property 'num' of undefined`

### 案例二
```js
var num = 10
const obj = {num: 20}
obj.fn = (function (num) {
  this.num = num * 3
  num++ // **严格模式下此行报错**
  return function (n) {
    this.num += n
    num++
    console.log(num)
  }
})(obj.num)
var fn = obj.fn
fn(5)
obj.fn(10)
console.log(num, obj.num) // **严格模式下此行报错**
```
非严格模式下输出：`22`、`23`、`65`、` 30`

严模式下报错：`Cannot set property 'num' of undefined`