---
title: JS闭包
date: 2017-03-07 14:11:54
tags: JavaScript
---

### 定义

闭包就是能够读取其他函数内部变量的函数。

### 作用/用途

- 可以读取函数内部的变量
- 在内存中维持一个变量

### 例子

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
对上面的例子稍作修改，如果我们在函数 bar 中声明一个变量 c，并在闭包 fn 中试图访问该变量，运行结果会抛出错误。

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

### setTimeout()闭包题

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

这是一道经典的闭包题，答案是输出 5 个 6，我们要如何修改才能使其输出 1~5？

页面中所有由 setTimeout 定义的操作，都将放在同一个队列中依次执行。而这个队列执行的时间，需要等待到函数调用栈清空之后才开始执行。即所有可执行代码执行完毕之后，才会开始执行由 setTimeout 定义的操作。而这些操作进入队列的顺序，则由设定的延迟时间来决定。
根据 setTimeout 定义的操作在函数调用栈清空之后才会执行的特点，for 循环里定义了 5 个 setTimeout 操作。而当这些操作开始执行时，for 循环的 i 值，已经先一步变成了 6。因此输出结果总为 6。而我们想要让输出结果依次执行，我们就必须借助闭包的特性，每次循环时，将 i 值保存在一个闭包中，当 setTimeout 中定义的操作执行时，则访问对应闭包保存的 i 值即可。
因此，我们只需要 2 个操作就可以完成题目需求，一是使用自执行函数提供闭包条件，二是传入 i 值并保存在闭包中。

```js
for (var i = 1; i <= 5; i++) {
  (function(i) {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  })(i);
}
```

也可以在 setTimeout 的第一个参数处利用闭包。

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(
    (function(i) {
      return function() {
        console.log(i);
      };
    })(i),
    i * 1000
  );
}
```

### 注意点

- 滥用闭包，会造成内存泄漏：由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在 IE 中可能导致内存泄露。解决方法是：在退出函数之前，**将不使用的局部变量全部删除**。

- 滥用闭包，会改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。
