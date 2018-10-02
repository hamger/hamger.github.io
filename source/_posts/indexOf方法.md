---
title: indexOf方法
date: 2018-02-28 21:55:25
tags: JavaScript
---
indexOf() 方法可返回某个指定的值在字符串或数组中**首次**出现的位置，**对象没有这个方法**。

### 语法
```
stringObject.indexOf(searchvalue,fromindex)
```
* searchvalue	必需。规定需检索的字符串值。
* fromindex	可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。

`indexOf()` 方法对大小写敏感！
如果要检索的字符串值没有出现，则该方法返回 -1。
与`indexOf()`相对的方法是`lastIndexOf()`。


### 应用拓展
```
let str2 = 'qwertyuioasdfghjke';
console.log(str2.indexOf('wer')); // 1
console.log(str2.indexOf('e')); // 2

let arr2 = [{aa: 13}, [12, 99], 96, '55', undefined, null];
console.log(arr2.indexOf({aa: 13})); // -1
console.log(arr2.indexOf([12, 13])); // -1
console.log(arr2.indexOf(96)); // 2
console.log(arr2.indexOf('55')); // 3
console.log(arr2.indexOf('96')); // -1
console.log(arr2.indexOf(55)); // -1
console.log(arr2.indexOf(undefined)); // 4
console.log(arr2.indexOf(null)); // 5
```
indexOf() 可以用来确定数组中是否存在某个**基本类型的值**或者`null`, 从上面的例子可以发现，indexOf无法确定数组和对象的存在，因为
```
{} == {} // false
[] == [] // false
```
但是如果是**引用地址**就可以确定是否存在
```
let obj = {aa: 13};
let arr = [12, 99];
let arr2 = [obj, arr, 96, '55', undefined, null];
console.log(arr2.indexOf(obj)); // 0
console.log(arr2.indexOf(arr)); // 1
```
