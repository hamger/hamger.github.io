---
title: JS事件模拟
date: 2017-03-15 20:13:03
tags: JavaScript
---
事件通常是在由用户和浏览器进行交互时触发，其实通过 Javascript 也可以在任何时间触发特定的事件。这种能力在测试web应用程序的时候，模拟事件是非常有用的。

## 事件模拟三步 
1. 通过 document.createEvent() 方法创建 event 对象，接收一个参数，即表示要创建的事件类型的字符串：
 	* UIEvents：通用的 UI 事件，鼠标事件键盘事件都是继承自UI事件，在 DOM3  级上使用的是 UIEvent 。
 	* MouseEvents：通用的鼠标事件，在 DOM3 级上使用的是 MouseEvent 。
 	* MutationEvents：通用的突变事件，在 DOM3 级上使用的是 MutationEvent 。
 	* HTMLEvents：通用的 HTML 事件，在 DOM3 级上还没有等效的。


2. 在创建了event对象之后，还需要使用与事件有关的信息对其进行初始化。每种类型的event对象都有一个特殊的方法，为它传入适当的数据就可以初始化该event对象。用 event.init......() 此类行的方法。
3. 触发事件。这需要使用 dispatchEvent()方法，接收一个参数，即表示要触发的 event 对象。

<!-- more -->
## 实例
以模拟鼠标事件为例，首先创建鼠标事件对象的方法 createEvent()传入MouseEvents，返回的对象的方法 initMouseEvent()，接收15个信息：

1. type（字符串）：事件类型如“click”；
2. bubble（布尔值）：是否冒泡；
3. cancelable（布尔值）：是否可取消；
4. view（AbstractView）：与事件关联的视图，一般为document.defaultView；
5. detail（整数）：一般为0，一般只有事件处理程序使用；
6. screenX（整数）：事件相对于屏幕的X坐标；
7. screenY（整数）；
8. clientX（整数）：事件相对于视口的X坐标；
9. clientY（整数）；
10. ctrlKey（布尔值）：是否按下了Ctrl键，默认为false；
11. altKey（布尔值）；
12. shiftKey（布尔值）；
13. metaKey（布尔值）；
14. button（整数）：表示按下了哪个鼠标键，默认为0；
15. relatedTarget（对象）：表示与事件相关的对象。一般只有在模拟mouseover与mouseout时使用。

最后记得把 event 对象传给 dispatchEvent() 方法。代码如下：
```js
var btn = document.querySelector("#btn");
//创建event
var event = document.createEvent("MouseEvents");
//初始化event
event.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
//click事件绑定事件处理程序
btn.onclick = function () {
    console.log("hello");
}
//触发事件
btn.dispatchEvent(event); //hello
//取消引用
btn.onclick = null;
```