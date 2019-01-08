---
title: webkit渲染机制
date: 2018-04-08 21:04:53
tags: other
---
#### 从输入URL到DOM
1. 用户输入URL，webkit调用其资源加载器加载对应的网页
2. 网页被交给HTML解释器,经历以下解析变成DOM结构：Bytes → Characters → Tokens → Nodes → Object Model。如果节点需要依赖其他资源：图片、css、视频等，调用资源加载器异步加载他们，期间不阻碍DOM树的构建
3. 如果遇到js标签，调用js引擎解释并执行，js可能会修改DOM树结构，所以会阻碍DOM树的构建。网页中依赖的js资源加载完成后，触发DOMContentLoad事件

<!-- more -->
DOM树上挂载的是DOM节点，页面上的每个HTML元素都存储成为一个DOM节点，比如body, div等。DOM树的根节点为Document节点。Render树上挂载的对象称为RenderObject，一般情况下DOM树上的每个节点对应RenderObject树上的一个节点，但是也有例外，比如某个DOM节点设置为None时，在Render树上就没有相对应的RenderObject。RenderObject对象实际上是DOM节点一个虚拟的输出，它知道如何控制DOM节点的绘制。

#### 从DOM到屏幕
1. css文件下载完成后会被css解释器解释成CSSOM， 并在DOM树上附加解释后的样式信息，构建RenderObject树，即：Render Tree。
2. webkit会根据网页的层次结构创建RenderLayer树，处理诸如z-index、浮动、定位等布局
3. 浏览器之后会将每个RenderLayer栅格化，并独立的绘制进位图中，将这些位图作为纹理上传至 GPU，复合多个层来生成最终的屏幕图像。

#### 树之间的关系
* DOM树: html代码下载完后解析的结果，包含了所有HTML标签，包括display:none的隐藏标签，还有用JS动态添加的元素等
* Render树: RenderObject组成的树结构，RenderObject和DOM结构的Node可视节点基本上是一对一的关系，CSSOM生成后和DOM树合成的树结构，DOM树知道如何绘制自己，但是要注意特殊情况。
* RenderLayer树: 由RenderLayer组成，RenderLayer和RenderObject是一对多的关系，RenderLayer主要负责网页的层次关系

#### 参考
[WEBKIT 渲染不可不知的这四棵树](https://juejin.im/entry/57f9eb9e0bd1d00058bc0a1b)
