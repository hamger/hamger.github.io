---
title: JS原型
date: 2017-03-07 10:46:16
tags: JavaScript
---

在 JS 中，主要有两种创建对象的方法, 分别是对象字面量以及调用构造函数

```js
//对象字面量
var obj1 = {};

//调用构造函数
var obj2 = new Object(); // typeof Object === 'function'

obj1.__proto__ === Object.prototype // true
```

### prototype 、constructor

** 每个函数 **默认会有一个`prototype`属性指向它的原型对象，
该原型对象会有一个`constructor`的属性，该属性包含一个指针，指向`prototype`属性所在函数，即

```js
Object.prototype.constructor === Object
```

### \_\_proto\_\_

每一个对象都有一个隐式的`__proto__`属性，指向**它们的构造函数的原型**，即

```js
obj1.__proto__ === Object.prototype // true
```
```js
obj1.__proto__.constructor === Object // true
```

### prototype 和 \_\_proto\_\_ 的区别

`prototype` 是**函数**才有的属性，`__proto__` 是**对象和函数**都有的属性（不是一个规范属性，只是部分浏览器实现了此属性，对应的标准属性是 `[[Prototype]]`）

### Object 和 Function 的关系

`Object`是`Function`的实例对象, `Function.prototype`是`Object`的实例对象。**Object本质是函数，Function本质是对象**。

```js
Object.__proto__ === Function.prototype;
Function.prototype.__proto__ === Object.prototype;
```

### 原型继承

利用 js 的原型，可以实现继承。

```js
function Box() {}
function Box2() {}
function Box3() {}

Box2.prototype = new Box();
Box3.prototype = new Box2();

var a = new Box2();
var b = new Box3();

a.__proto__ === Box2.prototype; // true
b.__proto__ === Box3.prototype; // true

// 原型链如下，到 null 终止
Box3.prototype.__proto__ === Box2.prototype; // true
Box2.prototype.__proto__ === Box.prototype; // true
Box.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null; // true
```
除了`Object`的原型对象`Object.prototype`的`__proto__`指向`null`，其他内置函数对象的原型对象（例如：`Array.prototype`）和自定义构造函数的`__proto__`都指向Object.prototype, 因为原型对象本身是普通对象。

ES5 有了 `Object.create()`，让我们更便捷地使用原型继承，`Object.getPrototypeOf`、`Object.setPrototypeOf` 可以更自由地操控原型链。
```js
function Box() {}
function Box2() {}
function Box3() {}

Box2.prototype = Object.create(Box.prototype)
Box3.prototype = Object.create(Box2.prototype)

console.log(Box3.prototype.__proto__ === Box2.prototype) // true
console.log(Box2.prototype.__proto__ === Box.prototype) // true
```