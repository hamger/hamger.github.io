---
title: JS正则表达式2
date: 2017-03-16 23:07:35
tags: RegExp
---
### RegExp 对象属性
属性 | 描述	
---- | ---
global | RegExp 对象是否具有标志 g
ignoreCase | RegExp 对象是否具有标志 i
multiline |	RegExp 对象是否具有标志 m
source | 正则表达式的源文本
lastIndex |	一个整数，标示开始下一次匹配的字符位置

lastIndex 语法 `RegExpObject.lastIndex` 
该属性存放一个整数，它声明的是上一次匹配文本之后的第一个字符的位置，该属性是可读写。
注意：不具有标志 g 和不表示全局模式的 RegExp 对象不能使用 lastIndex 属性。如果在成功地匹配了某个字符串之后就开始检索另一个新的字符串，需要手动地把这个属性设置为 0。
<!-- more -->
### RegExp 对象方法
方法 | 描述 | 语法
--- | --- | ----
complie | 重新编译正则表达式 | RegExpObject.complie(regexp)
test | 	检索字符串中的指定值，返回 true 或 false | RegExpObject.test(string)
exec | 	检索字符串中指定的值，返回找到的值，并确定其位置，详见[exec方法](https://hangermeng.top/2018/05/10/exec%E6%96%B9%E6%B3%95/) | RegExpObject.exec(string)

### 支持正则表达式的 String 对象的方法 
方法	| 描述	
---- | ----
search | 检索与正则表达式相匹配的值	，详见[String对象方法](https://hangermeng.top/2017/03/16/String%E5%AF%B9%E8%B1%A1%E6%96%B9%E6%B3%95/)
match |	找到一个或多个正则表达式的匹配，详见[match方法](https://hangermeng.top/2018/05/10/match%E6%96%B9%E6%B3%95/)
replace | 替换与正则表达式匹配的子串，详见[replace方法](https://hangermeng.top/2017/03/17/replace%E6%96%B9%E6%B3%95/)
split |	把字符串分割为字符串数组，详见[String对象方法](https://hangermeng.top/2017/03/16/String%E5%AF%B9%E8%B1%A1%E6%96%B9%E6%B3%95/)

### 分组
利用小括号将正则表达式分组，用 $1、$2... 代表每个组。 
```js
var date = "2016-11-25".replace(/(\d{4})-(\d{2})-(\d{2})/g,'$2\/$3\/$1')
console.log(date) // 11/25/2016
```

### 贪婪模式与非贪婪模式
贪婪模式下会比非贪婪模式多匹配字符，使用`?`表明是非贪婪模式。
```js
var num = "12345678".replace(/\d{3,6}/g,'X') // 贪婪模式取6个数字
console.log(num) //  "X78"
var num = "12345678".replace(/\d{3,6}?/g,'X') //非贪婪模式取3个数字
console.log(num) // "XX78" 
```
