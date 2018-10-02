---
title: JS正则表达式
date: 2017-03-16 10:49:25
tags: RegExp
---
### RegExp 对象
RegExp(regular expression) 对象表示正则表达式，它是对字符串执行模式匹配的强大工具。

### 创建 RegExp 对象
```js
var reg = new RegExp(pattern,modifiers);
var reg = /pattern/modifiers;
```
* pattern(模式) 描述了表达式的模式
* modifiers(修饰符) 用于指定全局匹配、区分大小写的匹配和多行匹配

```js
/* 注意一个是引号包裹，一个是斜杠包裹，特殊字符需要转义 */
var reg = RegExp("^qq\.com$")
var reg = / ^qq\.com$ /
```

### 修饰符

修饰符 | 描述
----- | ---
i   | 	执行对大小写不敏感的匹配
g   | 	执行全局匹配
m   | 	执行多行匹配

### 方括号 
方括号用于查找某个范围内的字符：

表达式 | 描述
----- | ---
[mhg] | 查找方括号之间的任何字符
[^mhg] | 查找任何不在方括号之间的字符
[a-z] | 查找任何从小写 a 到小写 z 的字符
(mh&#124;g&#124;abc) | 查找任何指定的选项


```js
var str = "Is this all there is?";
var patt1 = /[a-h]/g;
console.log(str.match(patt1)); // h,a,h,e,e
var patt2 = /(Is|is)/g;
console.log(str.match(patt2)); // Is,is,is
```

### 元字符
元字符（Metacharacter）是拥有特殊含义的字符(以下省略部分生僻元字符)：

元字符 | 描述
----- | ----
. | 所有单个字符，除了换行和行结束符
\w | 单词字符
\W | 非单词字符
\d | 数字字符
\D | 非数字字符
\s | 空白字符
\S | 非空白字符
\b | 单词边界
\B | 非单词边界
\n | 换行符
\r | 回车符(与换行符的区别请戳[这里](https://hamger.github.io/2017/03/10/%E6%8D%A2%E8%A1%8C%E7%AC%A6%E5%92%8C%E5%9B%9E%E8%BD%A6%E7%AC%A6%E7%9A%84%E5%8C%BA%E5%88%AB/))
\xxx | 以八进制数 xxx 规定的字符
\xdd | 以十六进制数 dd 规定的字符
\uxxxx | 以十六进制数 xxxx 规定的 Unicode 字符

### 量词
量词 | 描述
---- | ----
n+ | >=1(至少一个)
n* | >=0(任意个) 
n? | <=1(至多一个) 
n{X} | X个n 
n{X,Y} | X至Y个n 
n{X,} | 至少X个n 
n{0,X} | 至多X个n
n$ | 结尾为 n 的字符串
^n | 开头为 n 的字符串
?=n | 其后紧接 n 的字符串
?!n	| 其后没有紧接 n 的字符串

