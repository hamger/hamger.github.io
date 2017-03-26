---
title: JS事件委托
date: 2017-03-12 20:40:27
tags: JavaScript
---
## 事件委托是什么
事件委托，又叫事件代理，JavaScript高级程序设计上讲：事件委托就是利用** 事件冒泡 **，只指定一个事件处理程序，就可以管理某一类型的所有事件。

## 为什么需要事件委托
1. 在 JavaScript 中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能。如果用事件委托，与 dom 的操作就只需要交互一次，这样就能大大的减少与dom的交互次数，提高性能。
2. 每个函数都是一个对象，是对象就会占用内存，对象越多，内存占用率就越大，自然性能就越差了。如果用事件委托，那么我们就可以只对它的父级进行操作，这样就需要一个内存空间就够了，提高性能。

<!-- more -->
## 事件委托怎么实现
```html
    <div id="box">
        <input type="button" id="add" value="添加" />
        <input type="button" id="remove" value="删除" />
        <input type="button" id="move" value="移动" />
        <input type="button" id="select" value="选择" />
    </div>
```
```js
window.onload = function() {
    var oBox = document.getElementById("box");
    oBox.onclick = function(ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLocaleLowerCase() == 'input') {
            switch (target.id) {
                case 'add':
                    alert('添加');
                    break;
                case 'remove':
                    alert('删除');
                    break;
                case 'move':
                    alert('移动');
                    break;
                case 'select':
                    alert('选择');
                    break;
            }
        }
    }
}
```
Event 对象提供了一个属性叫 target ，可以返回事件的目标节点，也就是说，target 就可以表示为当前的事件操作的 dom 。存在兼容性问题，标准浏览器用 ev.target ，IE浏览器用 event.srcElement ，此时只是获取了当前节点的位置，并不知道是什么节点名称，这里我们用 nodeName 来获取具体是什么标签名，这个返回的是一个大写的，我们需要转成小写再做比较（习惯问题）。

## 适用事件
适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress。
值得注意的是，mouseover 和 mouseout 虽然也有事件冒泡，但是处理它们的时候需要特别的注意，因为需要经常计算它们的位置，处理起来不太容易。
不适合的就有很多了，比如 mousemove 每次都要计算它的位置，非常不好把控。还有 focus，blur之类的，本身就没用冒泡的特性，自然就不能用事件委托了。

