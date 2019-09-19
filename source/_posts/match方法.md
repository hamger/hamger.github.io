---
title: match方法
date: 2018-05-10 08:03:30
tags: JavaScript
---
match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。
```js
stringObject.match(regexp)
```
参数 | 描述
---- | ----
regexp | 该参数可以是需要在 string 中检索的子串，也可以是需要检索的 RegExp 对象。

返回一个存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。
<!-- more -->
* 如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本。除了这些常规的数组元素之外，返回的数组还含有两个对象属性。index 属性声明的是匹配文本的起始字符在 stringObject 中的位置，input 属性声明的是对 stringObject 的引用。

```js
var str="1s plus 2s equal 3s"
console.log(str.match(/(\d+)s/))
// ["1s", "1", index: 0, input: "1s plus 2s equal 3s", groups: undefined]
```

* 如果 regexp 具有标志 g，则 match() 方法将执行全局检索，找到 stringObject 中的所有匹配子字符串。若没有找到任何匹配的子串，则返回 null。如果找到了一个或多个匹配子串，则返回一个数组。不过全局匹配返回的数组的内容与前者大不相同，它的数组元素中存放的是 stringObject 中所有的匹配子串，而且也没有 index 属性或 input 属性。

```js
var str="1s plus 2s equal 3s"
console.log(str.match(/(\d+)s/g))
// ["1s", "2s", "3s"]
```

注意：在全局检索模式下，match() 即不提供与子表达式匹配的文本的信息，也不声明每个匹配子串的位置。如果您需要这些全局检索的信息，可以使用 [RegExp.exec()](https://hangermeng.top/2018/05/10/exec%E6%96%B9%E6%B3%95/#more)。