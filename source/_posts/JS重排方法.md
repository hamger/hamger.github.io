---
title: JS重排方法
date: 2017-03-14 19:48:15
tags: JavaScript
---
数组中已经存在两个可以直接用来重排序的方法：reverse() 和 sort() 。
## reverse()
reverse() 直接颠倒数组的顺序，改变原数组。
```js
var arr = [0, 1, 5, 10, 15]
arr.reverse()
console.log(arr) // [15, 10, 5, 1, 0]
```
这个方法的作用很直观，但是很明显不够灵活，因此才有了 sort() 方法。
<!-- more -->
## sort()
sort() 方法会先调用每个数组项的 toString() 方法，然后再比较得到的字符串。
```js
var arr = [0, 1, 5, 10, 15]
arr.sort()
console.log(arr) // [0, 1, 10, 15, 5]
```
但是这种效果一般都不是我们想要的，sort() 可以接受一个参数，该参数必须是函数，该函数接受两个参数。如果第一个参数应该位于第二个参数之前则返回负值，反之则改为正值。
```js
function compare(value1, value2) {
    if (value1 < value2) {
        return -1 
    } else if (value1 > value2) {
        return 1
    } else {
        return 0
    }
}
arr.sort(compare)
console.log(arr) // [0, 1, 5, 10, 15]
```
对于数值类型可以使用一个更简洁的方法
```js
function compare(value1, value2) {
    return value1 - value2 // 此为升序，降序则反减 
}
```
值得一提的是，利用 sort() 方法可以用来求数组的极值，极值即为重排序后数组的第一项和最后一项。