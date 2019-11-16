---
title: reduce方法
date: 2018-03-01 18:15:29
tags: JavaScript
---
reduce() 是 ECMAScript5 规范中出现的数组方法。一般而言，可以通过reduce方法实现的逻辑都可以通过forEach方法来实现。根据规范： 在一个空数组上应用reduce会抛初始化错误的异常`TypeError`。

### 语法
```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```
| 参数                                    | 描述                                   |
|-----------------------------------------|----------------------------------------|
| function(total,currentValue, index,arr) | 必需。用于执行每个数组元素的函数。     |
| total                                   | 必需。初始值, 或者计算结束后的返回值。 |
| currentValue                            | 必需。当前元素                         |
| currentIndex                            | 可选。当前元素的索引                   |
| arr                                     | 可选。当前元素所属的数组对象。         |
| initialValue                            | 可选。传递给函数的初始值               |

### 例子
```js
var numbers = [25, 14, 16, 5];
function getSum(total, item) {
    return total + item;
}
console.log(numbers.reduce(getSum)); // 60
```
```js
var items = [7, 12.1, 100.3];
var reducer = function add(total, item) {
  total.sum = total.sum + Math.round(item);;
  return total;
};
console.log(items.reduce(reducer, {sum: 0})); // {sum:119}
```
reduce 方法可用于解析对象链式属性
```js
var data = {
	num: {
		a: 12,
		b: 13
	}
}
'num.a'.split('.').reduce((obj, name) => obj[name], data) // 12
```
也可以用于函数式编程
```js
function compose(...funcs) {
    if (funcs.length === 0) return arg => arg
    if (funcs.length === 1) return funcs[0]
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
const func = compose(fn1,fn2,fn3) // (i) => fn1(fn2(fn3(i)))
func(5) // ((5 % 2) + 2) * 2 = 6
```