---
title: JS数组去重
date: 2017-03-11 20:40:13
tags: JavaScript
---
```js
function unique(array) {
    if (Array.isArray(array) && array.length > 0) {
        var arr = []
        for (var i = 0; i < array.length; i++) {
            if (arr.indexOf(array[i]) == -1) {
                arr.push(array[i])
            }
        }
        return arr
    } else {
        return false
    }
}
/*你可以像下面这样调用该函数了*/
var arr = [2, 4, 66, 55, 33, 55, 3, 4, 4, 32, 2]
console.log(unique(arr))
```
<!-- more -->
也可以将去重函数挂载在数组原型上，拓展了数组的基本方法，省去了判断参数类型的代码。
```js
Array.prototype.unique = function() {
        var res = []
        var json = {}
        for (var i = 0; i < this.length; i++) {
            if (!json[this[i]]) { 
                res.push(this[i])
                json[this[i]] = 1 // 传值随意
            }
        }
        return res
    }
/*你可以像下面这样调用该函数了*/
var arr = [2, 4, 66, 55, 33, 55, 3, 4, 4, 32, 2]
console.log(arr.unique())
```
### 最简单的实现
如果使用 es6 ，使用 set 可以快速实现
```js
function dedupe(arr) {
    return [...new Set(arr)]
}
```
