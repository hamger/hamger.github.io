---
title: JS继承方式
date: 2018-03-06 21:13:59
tags: JavaScript
---
要实现继承先定义一个父类
```js
function Animal (name) {
  this.name = name || 'Animal';
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};
```
### 原型链继承
核心： 将父类的实例作为子类的原型。
```js
function Cat () {}
Cat.prototype = new Animal('cat');
```
### 构造继承
核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类。
```js
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
```
<!-- more -->
### 实例继承
核心：为父类实例添加新特性，作为子类实例返回。
```js
function Cat(name){
  var instance = new Animal();
  instance.name = name || 'Tom';
  return instance;
}
```
### 拷贝继承
```js
function Cat(name){
  var animal = new Animal();
  for(var p in animal){
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.name = name || 'Tom';
}
```
### 组合继承
核心：构造继承 + 原型链继承，会调用了两次父类构造函数，生成了两份实例。
```js
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
Cat.prototype = new Animal();
```
### 寄生组合继承
核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点。
```js
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
(function(){
  var Super = function(){};
  Super.prototype = Animal.prototype;
  Cat.prototype = new Super();
})();
```
