---
title: String对象方法
date: 2017-03-16 08:10:54
tags: JavaScript
---
讨论完[Array对象的方法](https://hangermeng.top/2017/03/14/Array%E5%AF%B9%E8%B1%A1%E6%96%B9%E6%B3%95/)，再来讨论一下String对象的方法，两者拥有部分相似的方法：concat()、indexOf()、lastIndexOf()、slice()、valueOf()。这里不再赘述。

### 提取字符串
* substr()  语法`string.substr(start,length)`。如果start是负数，那么该参数声明从字符串的尾部开始算起的位置。如果 length 为 0 或负数，将返回一个空字符串。
* substring()  语法`string.substring(start,end)`。使用 start 和 end 两者中的较小值作为子字符串的起始点。如果 start 或 end 为 NaN 或者负数，那么将其替换为0。

substr()、substring()、slice() 三者都不改变原数组或字符串的值。

<!-- more -->
### 字符串转数组
* split() 把字符串分割为字符串数组。语法`string.split(separator,limit)`。返回的数组中的字串不包括 separator 自身。

参数 | 描述
---- | ----
separator | 可选。字符串或正则表达式，从该参数指定的地方分割 string Object。
limit | 可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。

`split("")` 会将 stringObject 中的每个字符之间都分割。
`split()` 会返回完整的字符串，即不做处理。
```js
var str="How are you doing today?";
var n=str.split(" "); // 注意这里的分隔符是空格
console.log(n) // ["How", "are", "you", "doing", "today?"]
```

### 去除空格
* trim() 去除字符串两边的空白，不改变原字符串。

注意到该方法只能去除两边的空白，实际工作中我们可能还需要将多个空格合并为一个空格，需要自己拓展：
```js
String.prototype.ResetBlank = function() { 
  var regEx = /\s+/g; 
  return this.replace(regEx, ' '); 
}; 
```

### 大小写转换
* toLowerCase() 把字符串转换为小写。
* toUpperCase() 把字符串转换为大写。

### 检索字符与转码
* charAt() 返回在指定位置的字符。
* charCodeAt() 返回在指定的位置的字符的 Unicode 编码。
* formCharCode() 将 Unicode 编码转为字符。

### 字符串查找与替换
* search() 查找正则表达式的匹配项的位置，返回一个数值。语法 `string.search(regexp)`

参数 | 描述
---- | ----
regexp | 该参数可以是需要在 string 中检索的子串，也可以是需要检索的 RegExp 对象。

返回 string 中第一个与 regexp 相匹配的子串的起始位置。如果没有找到任何匹配的子串，则返回 -1。要执行忽略大小写的检索，请追加标志 i。search() 方法不执行全局匹配，它将忽略标志 g。它同时忽略 regexp 的 lastIndex 属性，并且总是从字符串的开始进行检索，这意味着它总是返回 string 的第一个匹配的位置。

* match() 查找正则表达式的匹配，返回一个数组。详见[match方法](https://hangermeng.top/2018/05/10/match%E6%96%B9%E6%B3%95/)。
* replace() 在字符串中查找匹配的子串，并替换之。详见[replace方法](https://hangermeng.top/2017/03/17/replace%E6%96%B9%E6%B3%95/)。






