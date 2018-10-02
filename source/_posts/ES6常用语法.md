---
title: ES6常用语法
date: 2017-05-18 06:55:21
tags: ES6
---
> let,const 

let用于变量的声明，可以防止变量提升，实际上为JavaScript新增了块级作用域。用它所声明的变量，只在let命令所在的代码块内有效。const也用来声明变量，但是声明的是常量。一旦声明，常量的值就不能改变。

> class,extends,super 

```js
class Animal { // class定义一个“类”
    constructor(){
        this.type = 'animal'
    }
    says(say){
        console.log(this.type + ' says ' + say)
    }
}

let animal = new Animal()
animal.says('hello') //animal says hello

class Cat extends Animal { // extends实现继承
    constructor(){
        super() // 指代父类的this对象
        this.type = 'cat'
    }
}

let cat = new Cat()
cat.says('hello') //cat says hello
```

<!-- more -->

> arrow function

```js
function(i){ return i + 1; } //ES5
(i) => i + 1 //ES6

function(x, y) {
    x++;
    y--;
    return x + y;
}
(x, y) => {x++; y--; return x+y}
```
当我们使用箭头函数时，函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，它的this是继承外面的，因此内部的this就是外层代码块的this。

> template string

```js
$("#result").append(
  "There are <b>" + basket.count + "</b> " +
  "items in your basket, " +
  "<em>" + basket.onSale +
  "</em> are on sale!"
);

$("#result").append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

> destructuring

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
```js
let cat = 'ken'
let dog = 'lili'
let zoo = {cat: cat, dog: dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}

let cat = 'ken'
let dog = 'lili'
let zoo = {cat, dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}

let dog = {type: 'animal', many: 2}
let {type, many} = dog
console.log(type, many)   //animal 2
```

> default,rest 

default语法为某个参数指定默认值
```js
function animal(type){
    type = type || 'cat'  
    console.log(type)
}

function animal(type = 'cat'){
    console.log(type)
}
```
rest语法用于指代一类参数，可以替代ES5中是`arguments`
```js
function animals(...types){
    console.log(types)
}
animals('cat', 'dog', 'fish') //["cat", "dog", "fish"]
```

> import,export

在ES6之前为解决模块化问题，我们得利用第三方提供的一些方案，主要有两种CommonJS(服务器端)和AMD（浏览器端，如require.js）。
假设我们有两个js文件:index.js和content.js,现在我们想要在index.js中使用content.js返回的结果，我们来看看三种写法。

* require.js
```js
//content.js
define('content.js', function(){
    return 'A cat';
})

//index.js
require(['./content.js'], function(animal){
    console.log(animal);   //A cat
})
```

* CommonJs
```js
//index.js
var animal = require('./content.js')

//content.js
module.exports = 'A cat'
```

* ES6
```js
//index.js
import animal from './content'

//content.js
export default 'A cat'
```

> ES6 module高级用法

```js
//content.js
export default 'A cat'    
export function say(){
    return 'Hello!'
}    
export const type = 'dog'
```
上面可以看出，export命令除了输出变量，还可以输出函数，甚至是类.
```js
//index.js
import animal, { say, type } from './content'  
let says = say()
console.log(`The ${type} says ${says} to ${animal}`)  
//The dog says Hello to A cat
```

> as修改变量名

```js
import animal, { say, type as animalType } from './content'  
let says = say()
console.log(`The ${animalType} says ${says} to ${animal}`)  
```

> 模块的整体加载

用星号（*）指定一个对象，所有输出值都加载在这个对象上面,通常星号*结合as一起使用比较合适。
```js
  import animal, * as content from './content'  
  let says = content.say()
  console.log(`The ${content.type} says ${says} to ${animal}`)  
```











