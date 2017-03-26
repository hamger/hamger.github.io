---
title: JS正则表达式2
date: 2017-03-16 23:07:35
tags: RegExp
---
## RegExp 对象属性
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
## RegExp 对象方法
方法 | 描述 | 语法
--- | --- | ----
complie | 重新编译正则表达式 | RegExpObject.complie(regexp)
test | 	检索字符串中的指定值，返回 true 或 false | RegExpObject.test(string)
exec | 	检索字符串中指定的值，返回找到的值，并确定其位置 | RegExpObject.exec(string)

### exec()
exec() 方法的功能非常强大，它是一个通用的方法。该方法也非常有用，因此在此详细讲解。
如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。
此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。
除了数组元素和 length 属性之外，exec() 方法还返回两个属性。index 属性声明的是匹配文本的第一个字符的位置。input 属性则存放的是被检索的字符串 string。
在调用非全局的 RegExp 对象的 exec() 方法时，返回的数组与调用方法 String.match() 返回的数组是相同的。当 RegExpObject 是一个全局正则表达式时，它会在 RegExpObject 的 lastIndex 属性指定的字符处开始检索字符串 string。当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把 RegExpObject 的 lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。这就是说，您可以通过反复调用 exec() 方法来遍历字符串中的所有匹配文本。当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。
```js
var str = "Haha!My name is Hanger."; 
var patt = new RegExp("Ha","g");
var result;

while ((result = patt.exec(str)) != null)  {
  console.log(result);
  console.log(patt.lastIndex);
}
```
以上代码输出如下：
```js
["Ha", index: 0, input: "Haha!My name is Hanger."]
2
["Ha", index: 16, input: "Haha!My name is Hanger."]
18
```

## 支持正则表达式的 String 对象的方法 
方法	| 描述	
---- | ----
search | 检索与正则表达式相匹配的值	
match |	找到一个或多个正则表达式的匹配
replace | 替换与正则表达式匹配的子串
split |	把字符串分割为字符串数组

replace 方法在本博客[replace()方法](https://hamger.github.io/2017/03/17/replace-%E6%96%B9%E6%B3%95/#more)一文中有更详细的解释。
split 方法在本博客[String对象方法](https://hamger.github.io/2017/03/16/String%E5%AF%B9%E8%B1%A1%E6%96%B9%E6%B3%95/)一文中有更详细的解释。

## 分组
利用小括号将正则表达式分组，用 $1、$2... 代表每个组。 
```js
var date = "2016-11-25".replace(/(\d{4})-(\d{2})-(\d{2})/g,'$2\/$3\/$1')
console.log(date) // 11/25/2016
```

## 贪婪模式与非贪婪模式
贪婪模式下会比非贪婪模式多匹配字符，使用`?`表明是非贪婪模式。
```js
var num = "12345678".replace(/\d{3,6}/g,'X') // 贪婪模式取6个数字
console.log(num) //  "X78"
var num = "12345678".replace(/\d{3,6}?/g,'X') //非贪婪模式取3个数字
console.log(num) // "XX78" 
```









