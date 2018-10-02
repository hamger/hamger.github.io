---
title: js中的this指向
date: 2018-01-28 13:07:56
tags: JavaScript
---
### 实例
```js
var Obj = function(msg){
  this.msg = msg;
  this.shout = function(){
      console.log(this.msg);
  }  
  this.waitAndShout = function(){
      setTimeout(function () {
          this.shout();
      }.call(this),200);
  }
};
var obj = new Obj('haha');
obj.waitAndShout();
```
`obj`对象调用了`waitAndShout`,所以`waitAndShout`中的`this`指向`obj`，而`setTimeout`第一个参数的函数`this`被`call`指向了外层作用域的对象，即`obj`对象，所以打印出`haha`。这里如果不加`.call(this)`,就会报错`this.shout is not a function`。

### 核心
this永远指向最后调用它的对象（其上一级对象）；
函数没有被其上一级对象调用，其this指向window，严格模式下指向undefined；
函数被其上一级对象调用，其this指向其上一级对象。
<!-- more -->

### 特殊情况
```js
function fn()  
{  
    this.user = 'Hanger';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined

function fn()  
{  
    this.user = 'Hanger';  
    return undefined;
}
var a = new fn;  
console.log(a.user); //Hanger
```
如果返回值是一个对象(非 null )，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。

### ES6中箭头函数的`this`指向
箭头函数的`this`指向**定义时所在的作用域**，而不是运行时所在的作用域。
```js
var obj2 = {
    id: 2333,
    test: () => console.log(this)
}
obj2.test() // Window

var obj3 = {
    id: 2333,
    test: function () {console.log(this)}
}
obj3.test() // obj3

// 改成ES5写法如下
var obj2 = {};
obj2.id = 2333;
var _this = this;
obj2.test = function(){console.log(_this);}
```
此时`_this`的指向已经确定好了，无论使用任何`call`或者`apply`调用，都不会改变`_this`的值。

