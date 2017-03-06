---
title: apply、call、bind
date: 2017-03-06 14:46:04
tags: JavaScript
---

## 相同点
* apply 、call 、bind 三者都是用来改变函数的this对象的指向的；
* apply 、call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
* apply 、call 、bind 三者都可以利用后续参数传参；


## apply 、call
在 javascript 中，call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 this 的指向。
对于 apply、call 二者而言，作用完全一样，只是接受参数的方式不太一样。
```
var func = function(arg1, arg2) {};
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2]);
```
<!-- more -->
其中 this 是你想指定的上下文，他可以是任何一个 JavaScript 对象(JavaScript 中一切皆对象)，call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。
JavaScript 中，某个函数的参数数量是不固定的，因此当你的参数是明确知道数量时用 call 。而不确定的时候用 apply，然后把参数 push 进数组传递进去。当参数数量不确定时，函数内部也可以通过 arguments 这个数组来遍历所有的参数。

### 数组间追加
```
var array1 = [12 , "foo" , {name "Joe"} , -2458]; 
var array2 = ["Doe" , 555 , 100]; 
Array.prototype.push.apply(array1, array2); 
/* array1 值为  [12 , "foo" , {name "Joe"} , -2458 , "Doe" , 555 , 100] */
```

### 求数组极值
```
var numbers = [5, 458 , 120 , -215 ]; 
var maxInNumbers = Math.max.apply(Math, numbers), //458
    minInNumbers = Math.min.apply(Math, numbers); //-215
```

### 改造 console.log()
```
function log(){
  var args = Array.prototype.slice.call(arguments); // 将 arguments 伪数组转化为标准数组
  args.unshift('(app)'); // 给每一个 log 消息添加一个 ”(app)” 的前辍
  console.log.apply(console, args); 
};

log(1, 2, 3) // (app) 1 2 3
```

## bind 
bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，会以传入 bind()方法的第一个参数作为 this，传入 bind() 方法的之后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。
```
var foo = {
    bar : 1,
    eventBind: function(){
        $('.someClass').on('click',function(event) {
            console.log(this.bar);      //1
        }.bind(this));
    }
}
```
如果多次调用 bind() ，仍然会输出第一次的结果。在Javascript中，多次 bind() 是无效的。

另外 bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用。
```
var obj = {
    x: 81,
};
 
var foo = {
    getX: function() {
        return this.x;
    }
}
 
console.log(foo.getX.bind(obj)());  //81 注意到多一个小括号
console.log(foo.getX.call(obj));    //81
console.log(foo.getX.apply(obj));   //81
```
