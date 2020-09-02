---
title: js变量提升
date: 2020-09-02 15:08:04
tags: JavaScript
---
### 全局中的解析和执行过程
预处理：创建一个词法环境（LexicalEnvironment，在后面简写为LE），扫描JS中的**用声明的方式声明的函数**和**用var定义的变量**，将它们加到预处理阶段的词法环境中去。

#### 一、全局环境中如何理解预处理
```js
var a = 1;//用var定义的变量，以赋值
var b;//用var定义的变量，未赋值
c = 3;//未定义，直接赋值
function d(){//用声明的方式声明的函数
    console.log('hello');
}
var e = function(){//函数表达式
    console.log('world');
}
```
在预处理时上面代码创建词法作用域可以这样表示：
```js
LE { // 此时的LE相当于window
    a:undefined
    b:undefined
    d:对函数的一个引用
}
```

<!-- more -->
#### 二、命名冲突的处理
```js
console.log(f);
var f = 1;
function f(){console.log('foodoir');}
// 输出 function f(){console.log('foodoir');}
```
```js
console.log(f);
var f = 1;
function f(){console.log('foodoir');}
// 输出 function f(){console.log('foodoir');}
```
```js
console.log(f);
var f = 1;
var f = 2;
// 输出 undefined
```
```js
console.log(f);
function f(){console.log('foodoir');}
function f(){console.log('hello world');}
// 输出 function f(){console.log('hello world');}
```
原因：**处理函数声明有冲突时，会覆盖；处理变量声明有冲突时，会忽略**。在既有函数声明又有变量声明的时候，函数声明的权重总是高一些，所以最终结果往往是指向函数声明的引用。

### 函数中的解析和执行过程
函数中的解析和执行过程的区别不是很大，但是函数中有个arguments我们需要注意一下，我们来看下面的例子：
```js
function f(a,b){
    console.log(a);
    console.log(b);
    var b = 100;
    function a(){}
}
f(1,2);
```
分析函数的预处理，它和全局的预处理类似，它的词法结构如下：
```js
LE {
    b: 2
    a: 指向函数的引用
    arguments：2 // 调用函数时实际调用的参数个数
}
```
输出的结果为：
```js
function a(){}
2
```
当传入的参数值有一个时：
```js
f(1);
```
这个时候的词法结构如下：
```js
LE {
    b: undefined
    a: 指向函数的引用
    arguments：2 // 调用函数时实际调用的参数个数
}
```

### 关于JS作用域和作用域链
在编程语言中，作用域一般可以分为四类：块级作用域、函数作用域、动态作用域、词法作用域（也称静态作用域）

#### 块级作用域
在其它C类语言中，用大括号括起来的部分被称为作用域，但是在javascript并没有块级作用域，来看下面一个例子：~
```js
for(var i=0;i<3;i++){
    //
}
console.log(i);
```
它的结果为3，原因：执行完for循环后，此时的i的值为3，由于javascript并没有块级作用域，在后面仍有效。

#### 函数作用域
没有纯粹的函数的作用域

#### 动态作用域
```js
function f(){
    alert(x);
}
function f1(){
    var x = 1;
    f();
}
f1();
```
如果说存在动态作用域，那么结果应该是分别为1，但是最终结果是：x is not defined。所以javascript也没有动态作用域

#### 词法作用域（也称静态作用域）
```js
var x = 100
function f(){
    alert(x);
}
function f1(){
    var x = 1;
    f();
}
f1();
```
弹出100。说明javascript的作用域为静态作用域 ，分析：
```js
function f(){
    alert(x);
}
// f [[scope]]  == LE ==  window
//创建一个作用域对象f [[scope]]，它等于创建它时候的词法环境LE（据前面的知识我们又可以知道此时的词法环境等于window）

function f1(){
    var x = 1;
    f();//真正执行的时候（一步一步往上找）LE  ->f.[[scope]]  ==  window
}
```
在词法解析阶段，就已经确定了相关的作用域。作用域还会形成一个相关的链条，我们称之为作用域链。来看下面的例子：
```js
function f(){    // f.scope == window
    var x = 100;//f.LE == {x:100,g:函数}
    
    var g = function(){// g.scope = f.LE        
        alert(x);
    }
    g();//在执行g的时候，先找 g.scope，没有的话再找 f.LE，还没有的话找f.scope……一直往上找window    
}
f();
```
new Function的情况又不一样，**Function 创建的函数只能在全局作用域中运行**。
```js
var x= 123;
function f(){
    var x = 100;
    //g.[[scope]]  == window
    var g = new Function("","alert(x)");
    g();
}
f(); //结果为：123
```

[原文地址](https://www.cnblogs.com/libin-1/p/5979303.html)