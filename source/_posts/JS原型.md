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
** 每个对象 **默认会有一个protoype属性指向它的原型，
** 构造函数的原型 **会有一个consctructor的属性指向构造函数本身，即
`Person.prototype.constructor === Person`
<!-- more -->

## \_\_proto\_\_
每一个** new出来的实例 **都有一个隐式的\_\_proto\_\_属性，指向它们的构造函数的原型，即
```js
person1.__proto__ === Person.constructor
person1.__proto__.constructor === Person
```

## 图片说明
![关系图](http://upload-images.jianshu.io/upload_images/599584-8194e8e27cd76271.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Object和Function的关系
Object本身是一个构造函数，它也是一个对象，那么
`Object.__proto__ === Function.prototype`

Function的** 原型属性 **与Function的** 原型 **指向同一个对象，即
```js
Function.__proto__ == Function.prototype
typeof Function.prototype === 'function'
```