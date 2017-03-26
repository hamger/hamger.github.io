---
title: JS闭包
date: 2017-03-07 14:11:54
tags: JavaScript
---
## 定义
当一个函数可以记住并访问所在的作用域（全局作用域除外），并在定义该函数的作用域之外执行时，该函数就可以称之为一个闭包。
简单来说，假设函数A在函数B的内部进行定义了，并在函数B的作用域之外执行（不管是上层作用域，下层作用域，还有其他作用域），那么函数A就是一个闭包。

## 例子
通过闭包，我们可以在其他的执行上下文中，** 访问到函数的内部变量 **。
<!-- more -->
```js
var fn = null;
function foo() {
    var a = 2;
    function innnerFoo() { 
        console.log(a);
    }
    fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
}

function bar() {
    fn(); // 此处的保留的innerFoo的引用
}

foo();
bar(); // 2
```
需要注意的是，虽然例子中的闭包被保存在了全局变量中，但是** 闭包的作用域链并不会发生任何改变 **。在闭包中，能访问到的变量，仍然是作用域链上能够查询到的变量。
对上面的例子稍作修改，如果我们在函数bar中声明一个变量c，并在闭包fn中试图访问该变量，运行结果会抛出错误。
```js
var fn = null;
function foo() {
    var a = 2;
    function innnerFoo() { 
        console.log(c); // 在这里，试图访问函数bar中的c变量，会抛出错误
        console.log(a);
    }
    fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
}

function bar() {
    var c = 100;
    fn(); // 此处的保留的innerFoo的引用
}

foo();
bar();
```
## setTimeout()闭包题
```js
for (var i=1; i<=5; i++) { 
    setTimeout( function timer() {
        console.log(i);
    }, i*1000 );
}
```
这是一道经典的闭包题，答案是输出5个6，我们要如何修改才能使其输出1~5？

页面中所有由setTimeout定义的操作，都将放在同一个队列中依次执行。而这个队列执行的时间，需要等待到函数调用栈清空之后才开始执行。即所有可执行代码执行完毕之后，才会开始执行由setTimeout定义的操作。而这些操作进入队列的顺序，则由设定的延迟时间来决定。
根据setTimeout定义的操作在函数调用栈清空之后才会执行的特点，for循环里定义了5个setTimeout操作。而当这些操作开始执行时，for循环的i值，已经先一步变成了6。因此输出结果总为6。而我们想要让输出结果依次执行，我们就必须借助闭包的特性，每次循环时，将i值保存在一个闭包中，当setTimeout中定义的操作执行时，则访问对应闭包保存的i值即可。
因此，我们只需要2个操作就可以完成题目需求，一是使用自执行函数提供闭包条件，二是传入i值并保存在闭包中。
```js
for (var i=1; i<=5; i++) { 

    (function(i) {
        setTimeout( function timer() {
            console.log(i);
        }, i*1000 );
    })(i)
}
```
也可以在setTimeout的第一个参数处利用闭包。

```js
for (var i=1; i<=5; i++) { 
    setTimeout( (function(i) {
        return function() {
            console.log(i);
        }
    })(i), i*1000 );
}
```


