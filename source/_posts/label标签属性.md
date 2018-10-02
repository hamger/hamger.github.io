---
title: label标签属性
date: 2018-02-22 19:21:17
tags: HTML
---
label标签用来定义表单控件间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。label标签有两个属性`for`和`accesskey`。

`for`属性：表示label标签要绑定的HTML元素，你点击这个标签的时候，所绑定的元素将获取焦点。
```
<Label for="InputBox">姓名</Label><input id="InputBox" type="text"> 
```
`accesskey`属性：表示访问label标签所绑定的元素的热键，当您按下热键，所绑定的元素将获取焦点。
```
<Label for="InputBox" ACCESSKEY="N">姓名</Label><input id="InputBox" type="text">
```
