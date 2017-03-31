---
title: JS原生DOM操作
date: 2017-03-29 23:05:04
tags: JavaScript
---
jQuery 用久了，原生JS操作 DOM 的方法就容易忘，在此好好归纳一下原生的常用方法。

## 创建元素
> 创建元素：document.createElement()

```js
var div = document.createElement("div");
div.id = "myDiv";
div.className = "div1";
document.body.appendChild(div);
```

> 创建文本节点 ：document.createTextNode()

```js
var node = document.createTextNode("我是文本节点");  
document.body.appendChild(node);
```

## 节点关系
```html
<div id="div0">
    <div id="div1" name="nameone">1</div>
    <div id="div2" class="div2">2</div>
    <div id="div3">3</div>
</div>
```
> 父节点：parentNode

```js
var child2 = document.getElementById("div2");
var parent = child2.parentNode;
```
<!-- more -->

> 子节点：children、childNodes

children 只读属性，返回节点的子节点集合，不包括文本节点，只有元素节点，推荐使用。   
childNodes 只读属性，返回节点的子节点集合，包括元素节点和文本节点(换行，空格也算)。 该集合为即时更新的集合（live collection），即对节点元素的任意修改都会立即反映到结果里。  
```js
    var allChilds = parent.childNodes;
    console.log(allChilds.length) // 返回7，IE返回3  
    var nodeAdd = document.createElement("div");
    var textAdd = document.createTextNode("这是添加的文本节点");
    nodeAdd.appendChild(textAdd);
    parent.appendChild(nodeAdd);
    console.log(allChilds.length);// 返回8，IE返回4
```

> 兄弟节点：nextSibling、previousSibling

node.nextSibling || node.nextElementSibling 下一个兄弟节点
node.previousSibling || node.previousElementSibling 上一个兄弟节点
注意，前者包含文本节点和元素节点，后者只包含元素节点，后者IE9+支持

```js
var next = child2.nextSibling;
var previous = child2.previousSibling;
```

> 第一个或最后一个子节点：firstChild、lastChild

```js
var first = parent.firstChild; 
var last = parent.lastChild; 
```

## 节点操作 
> 添加节点：appendChild()

appendChild()用于向childNodes列表的末尾添加一个节点，并且返回这个新增的节点。
如果传入到appendChild()里的节点已经是文档的一部分了，那结果就是将节点从原来的位置转移到新位置，任何一个节点不能同时出现在文档中的多个位置。

> 插入节点：insetBefore()

insetBefore()可以将节点插入到某个特定的位置。这个方法接受两个参数：要插入的节点和作为参照的节点。
插入节点后，被插入的节点变成参照节点的前一个同胞节点，同时被方法返回。 如果参照节点是null，则与appendChild()执行相同的操作。
```js
    var returnNode = someNode.insetBefore(newNode, null);
    var returnNode = someNode.insetBefore(newNode, someNode.firstChild);
    var returnNode = someNode.insetBefore(newNode, someNode.lastChild);
```

> 替换节点： replaceChild()

replaceChild()接受两个参数：要插入的节点和要被替换的节点。被替换的节点将由这个方法返回并从文档中被移除，同时由要插入的节点占据其位置。

> 删除节点：removeChild()

该方法接受一个参数，即要移除的节点，同时该方法返回被移除的节点。只能是一个节点，不能是一组节点。

> 克隆节点：cloneNode(true/false)

返回节点的一个副本。参数表示是否采用深度克隆,如果为true,则该节点的所有后代节点也都会被克隆,如果为false,则只克隆该节点本身，文本、换行、空格等不会被复制。默认为true。
克隆一个元素节点会拷贝它所有的属性以及属性值,包括了属性上绑定的事件(比如onclick="alert(1)"),但不会拷贝那些使用addEventListener()方法或者node.onclick = fn这种用JavaScript动态绑定的事件。
注意:为了防止一个文档中出现两个ID相同的元素,使用cloneNode()方法克隆的节点在需要时应该指定新ID值。
```js
var cloneHtml = child2.cloneNode(true);
document.body.appendChild(cloneHtml);
```

## 元素选择
> querySelector()、querySelectorAll() (IE8+)

querySelector 返回相匹配的** 第一个 **Element节点。如果没有相匹配的，则返回null。
querySelectorAll 返回相匹配的** 所有 **Element节点列表，如果没有相匹配的，则返回一个空节点列表。
```js
var special = document.querySelectorAll( "p.warning, p.note" );
var el = document.querySelector( "#main, #basic, #exclamation" );
```
执行上面的代码后，el包含了文档中元素的ID是main、basic** 或 **exclamation的** 所有元素中的第一个元素 **。

> getElementsBy系列

```js
var element1 = document.getElementById("div0");
var element2 = document.getElementsByClassName("div2");
var element3 = document.getElementsByTagName("div");
var element4 = document.getElementsByName("nameone");
```

## 属性操作 

> Attribute系列

```js
child2.setAttribute("class", "new_class");
child2.removeAttribute("class");
var attr = child2.getAttribute("class");
console.log(attr); // null
var hasName = child2.hasAttribute("name");
console.log(hasName); // true
```

> 自定义属性

HTML5 中`data-*`可以给指定元素添加自定义的属性。
```html
<div id="div4" data-aa="11">
```
利用`div4.dataset`可以获得一个DOMStringMap，包含了元素的所有`data-*`。
使用`div4.dataset.aa`返回值为11。
通过设置`div4.dataset.bb = "22"`就可以添加一个新的自定义属性。
不兼容则使用getAttribute和setAttribute。
```js
    var div4 = document.getElementById("div4");
    var a = null;
    if (div4.dataset) {
        a = div4.dataset.aa;
        div4.dataset.bb = "22";
    } else { 
        a = div4.getAttribute("data-aa");
        div4.setAttribute("data-bb", "22");
    }
```




















