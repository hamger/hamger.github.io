---
title: JS原型
date: 2017-03-07 10:46:16
tags: JavaScript
---
## JS创建对象
在JS中，主要有两种创建对象的方法, 分别是对象字面量以及调用构造函数
 ```js
//对象字面量
var obj1 = {}
 
//调用构造函数
var obj2 = new Object()
```

## prototype 、constructor
** 每个函数 **默认会有一个`protoype`属性指向它的原型对象，
该原型对象会有一个`consctructor`的属性，该属性包含一个指针，指向`prototype`属性所在函数，即
```js
Person.prototype.constructor === Person
```

<!-- more -->
## \_\_proto\_\_
每一个** new出来的实例 **都有一个隐式的\_\_proto\_\_属性，指向它们的构造函数的原型，即
```js
person1.__proto__ === Person.prototype
```
再结合`Person.prototype.constructor === Person`就可以得到：
```js
person1.__proto__.constructor === Person
```
## 图片说明
![关系图](http://upload-images.jianshu.io/upload_images/599584-8194e8e27cd76271.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Object和Function的关系
`Object`是`Function`的实例对象, `Function.prototype`是`Object`的实例对象。
```js
Object.__proto__ === Function.prototype
Function.prototype.__proto__ === Object.prototype
```
根据上式我们还可以得到：
```js
Function.__proto__.__proto__ === Object.prototype
```

## 原型继承
利用js的原型，可以实现继承。
```js
    function Box() {
        this.name = 'Bob'
    }

    function Box2() {
        
    }

    Box2.prototype = new Box()

    var aa = new Box2()

    console.log(aa.name) // 'Bob'
```