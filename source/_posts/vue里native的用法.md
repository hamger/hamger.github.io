---
title: vue里native的用法
date: 2017-12-24 21:27:42
tags: Vue.js
---

用vue写的项目中遇到给`router-link`标签添加事件`@click`、`@mouseover`等无效的情况
解决方法是使用`native`

原代码：
```
<router-link  v-for="(item, index) in pageMenuList" :to="{ path: item.listLink }" @mouseover="overTag(index)" @mouseout="outTag(index)">{{item.listTitle}}
    <i class="contain_tab_close" v-show="selected==index"></i>
</router-link>
```
根据Vue2.0官方文档关于父子组件通讯的原则，父组件通过prop传递数据给子组件，子组件触发事件给父组件。但父组件想在子组件上监听自己的click的话，需要加上native修饰符。

如果在想要在`router-link`上添加事件的话需要`@click.native`这样写。

所以如果要事件有效的话，应改成如下：
```
<router-link  v-for="(item, index) in pageMenuList" :to="{ path: item.listLink }" @mouseover.native="overTag(index)" @mouseout.native="outTag(index)">{{item.listTitle}}
    <i class="contain_tab_close" v-show="selected==index"></i>
</router-link>
```
