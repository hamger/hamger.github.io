---
title: event.srcElement与event.target的区别
date: 2018-02-14 21:12:24
tags: JavaScript
---
`event.srcElement`与`event.target`两者作用相同，都是指向触发事件的元素，包含了该元素的各种属性。IE浏览器支持`srcElement`，而firefox支持`target`，解决兼容的方法
```
var eve = event.srcElement ? event.srcElement : event.target;
```
### this 与 event.srcElement
```
<input type="text" onblur="alert(this.value)"/> // 合法

fuction method() {
  alert(this.value);
}
<input type="text" onblur="method()"/> // 非法，method() 是被响应函数调用的函数。 
```
解决方法如下
```
fuction method(btn) {
  alert(btn.value);
}
<input type="text" onblur="method(this)"/>
// 或者
fuction method(btn) {
  alert(window.event.srcElement.value);
}
<input type="text" onblur="method()"/>
```
