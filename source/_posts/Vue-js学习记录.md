---
title: Vue.js学习记录
date: 2017-02-28 16:04:04
tags: 
  - Vue.js
---
### 引言
我第一次接触vue，是在一位朋友的推荐下去学习的，做为一枚小白，当时只知道jquery这个js框架，其它的都不了解，一开始接触vue的时候老实说我是一脸懵逼的，一下子还没从jQuery的思维中解脱出来，因此研究了好久的，过了一段时间后，再翻开vue的文档，总算是有些眉目了，现在记录下自己的理解吧，有写的不对的地方欢迎指正。这里只记录我认为比较重要的东西，要详细点的当然是看Vue文档啦。

### 我理解的vue核心思想

1.视图参数化，数据驱动视图！
view(DOM节点)的属性被参数化，参数化的值被记录在Vue实例的data属性中，当通过methods中的函数改变data中的数据时，view也会发生变化，从而达到数据驱动视图的作用。
<!-- more -->
2.DOM结构组件化
组件化的思想提高了DOM结构的复用性，使搭架复杂的DOM结构更加简单快捷。组件需要先注册`Vue.component(tagName, options)` 注册后就可以在HTML文档中直接使用了`<tagName></tagName>`

### v-bind、v-on
v-bind：的缩写为 ：用来绑定元素的属性，属性的值被记录在Vue.data中
v-on：的缩写为 @ 用来绑定元素的事件，事件响应程序被记录在Vue.methods中

```html
<div v-bind:class="[red,blue ? 'blue' : 'green']" v-on:click='changeColor'></div>
...
changeColor:function () {
    this.blue = !this.blue
}
```
### computed 
computed是基于依赖的缓存，当重新渲染时，methods中的函数会被重新调用，而computed中的函数在依赖不变的情况下不会被调用

### v-model
v-model用在表单中，实现双向数据绑定。
```html
<div id="app">
  <p>input 元素：</p>
  <input v-model="message" placeholder="编辑我……">
  <p>消息是: {{ message }}</p>
    
  <p>textarea 元素：</p>
  <p style="white-space: pre">{{ message2 }}</p>
  <textarea v-model="message2" placeholder="多行文本输入……"></textarea>
</div>
<script>
new Vue({
  el: '#app',
  data: {
    message: 'Runoob',
    message2: '菜鸟教程\r\nhttp://www.runoob.com'
  }
})
</script>
```
用户更改表单中的输入，会改变视图层的显示。

#### .lazy
在默认情况下， v-model 在 input 事件中同步输入框的值与数据，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步：
```html
<input v-model.lazy="msg" >
```
#### .number
如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值：
```html
<input v-model.number="age" type="number">
```
#### .trim 
如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入：
```html
<input v-model.trim="msg">
```

### 组件

####  全局组件
```html
<div id="app">
    <runoob></runoob>
</div>
<script>
// 注册
Vue.component('runoob', {
  template: '<h1>自定义组件!</h1>'
})
// 创建根实例
new Vue({
  el: '#app'
})
</script>
```
#### 局部组件

```js
var Child = {
    template:'<h1>自定义组件</h1>'
}
new Vue({
    el:'#app',
    components:{
        'runoob':Child
    }
})
```