---
title: replace方法
date: 2017-03-17 12:12:23
tags: JavaScript
---
replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子字符串。
语法 `string.replace(searchvalue,newvalue)`

参数 | 描述
---- | ----
searchvalue | 必须。规定子字符串或要替换的模式的 RegExp 对象。
newvalue | 必须。规定了替换文本或生成替换文本的函数。

## 简单实例
执行一个全局替换, 忽略大小写:
```js
var str="Mr Blue has a blue house and a blue car";
var n=str.replace(/blue/gi, "red");
console.log(n) // Mr red has a red house and a red car
```

<!-- more -->
## newvalue 参数为函数
newvalue 参数为字符串的情况很简单，但是该参数也可以为函数，该情况下使得 replace() 方法的功能得到巨大提升。 

下面这段代码等价于第一个例子：
```js
var n=str.replace(/blue/gi, function(){
  return "red"});
```
上面代码中的匿名函数也可以接受参数，下面是该函数的参数(按参数先后排列)：

形参名 | 代表的值
----- | -------
match | 被匹配的** 子字符串 **。
$1,$2,... | 如果 searchvalue 是正则表达式，则代表第n个小括号匹配的字符串。
offset | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是“abcd”，匹配到的子字符串时“bc”，那么这个参数将是1）
string | 被匹配的** 原字符串 **。

以下例子是很好的说明，代码如下：
```js
var tpl = 'Hello, my name is <%name%>, I am <%age%> years old.'
var para = ''
function tplEngine(tpl) {
    tpl.replace(/<%([^%>]+)?%>/g, function(a, b, c, d) {
        para += '第一个参数：' + a + '， 第二个参数：' + b + '，第三个参数：' + c + '， 第四个参数：' + d + '\n'
    })
    return para
}
tplEngine(tpl)
console.log(para)
// 第一个参数：<%name%>, 第二个参数：name，第三个参数：18, 第四个参数：Hello, my name is <%name%>, I am <%age%> years old.
// 第一个参数：<%age%>, 第二个参数：age，第三个参数：33, 第四个参数：Hello, my name is <%name%>, I am <%age%> years old.
```
这样每个参数对应的值就很明显了，并且我们还可以看到：如果 searchvalue 是正则表达式，并且其为全局匹配模式，那么该函数将被多次调用，每次匹配都会被调用。

## 应用案例
利用上述理论基础，我们可以自己做一个简易的模板引擎，代码如下：
```js
var data = {
    'name': 'Tom',
    'age': 28,
    'occupation': 'doctor'
}

var tpl = 'Hello, my name is <%name%>, I am <%age%> years old. My job is <%occupation%>.'

function tplEngine(tpl, data) {
    var text = tpl.replace(/<%([^%>]+)?%>/g, function(a, b) {
        return data[b]
    })
    return text
}

var text = tplEngine(tpl, data)
console.log(text)
// Hello, my name is Tom, I am 28 years old. My job is doctor.
```
强化后的模板引擎如下：
```js
var data = [{
    'name': 'Tom',
    'age': 28,
    'occupation': 'doctor',
    'grade': {
        'a': 'A',
        'b': 'B',
        'c': 'C'
    },
    'fruits': ['apple', 'banana', 'enanas']
}, {
    'name': 'Alice',
    'age': 18,
    'occupation': 'student',
    'grade': {
        'a': 'A',
        'b': 'B',
        'c': 'C'
    },
    'fruits': ['watermelon', 'orange', 'pear']
}, {
    'name': 'Haren',
    'age': 32,
    'occupation': 'teacher',
    'grade': {
        'a': 'A',
        'b': 'B',
        'c': 'C'
    },
    'fruits': ['apple', 'grape', 'pear']
}]

var tplA = 'NO <@1@> <@2@>, my name is <%name%>, I am <%age%> years old. My job is <%occupation%>.The Grade of My  test is <% grade.a %>. My favorite fruits are <%fruits%>.\n'
var tplB = 'NO <@1@> <@2@>, my name is <%name%>, I am <%age%> years old. My job is <%occupation%>.The Grade of My  test is <% grade.b %>. My favorite fruits are <%fruits%>.\n'
var tplC = 'NO <@1@> <@2@>, my name is <%name%>, I am <%age%> years old. My job is <%occupation%>.The Grade of My  test is <% grade.c %>. My favorite fruits are <%fruits%>.\n'

var tpl = [tplA, tplB, tplC]

function tplEngine(tpl, obj,variate1,variate2,separator) {
    if (variate1 || variate1 === 0) {
        var tpl = tpl.replace(/<@1@>/g, function(a, b) {
            return variate1
        })
    }
    if (variate2 || variate2 === 0) {
        var tpl = tpl.replace(/<@2@>/g, function(a, b) {
            return variate2
        })
    }
    if (!separator && separator !== 0) {
        separator = ','
    }
    var tpl = tpl.replace(/<%([^%>]+)?%>/g, function(a, b) {
        var b = b.trim()
        if (/\./.test(b)) {
            var arr = b.split('.')
            if (obj[arr[0]][arr[1]] instanceof Array) {
                return obj[arr[0]][arr[1]].join(separator)
            } else {
                return obj[arr[0]][arr[1]]
            }
        } else {
            if (obj[b] instanceof Array) {
                return obj[b].join(separator)
            } else {
                return obj[b]
            }
        }
    })
    return tpl
}
var str = ''
for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < 2; j++) {
        str += tplEngine(tpl[i], data[i],i,j)
    }
}
console.log(str)
```