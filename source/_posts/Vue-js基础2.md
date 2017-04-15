---
title: Vue.js基础2
date: 2017-02-28 16:10:44
tags: Vue.js
---
继续组件的内容，接下来是 vue 组件的重要内容。

#### 父子组件
子组件只能在父组件中只用，写在html中的是父组件的标签。使用组件有三步：定义，注册，创建根实例。以下代码是很好的例子：
```html
<div id="example">
    <my-component></my-component>
</div>
<script>
  //定义组件 
  var child = Vue.extend({
    template: "<div>this is a child component!</div>"
  })
  var parent = Vue.extend({
    template: "<div>this is a parent component! <child></child></div>",
    components: {
      'child': child 
    }
  })
  //注册组件
  Vue.component('my-component', parent)
  //创建根实例
  new Vue({
    el:'#example'
  })
</script>
```
<!-- more -->

#### 组件选项问题
传入 Vue 构造器的多数选项也可以用在 Vue.extend() 中，不过有两个特例： data 和 el。如果我们简单地把一个对象作为 data 选项传给 Vue.extend（）， 所有的实例将共享同一个 `data` 对象！这基本不是我们想要的，因此我们应当使用一个函数作为 `data` 选项，让这个函数返回一个新对象：
```js
	var child = Vue.extend({
		template: "<div>this is a child component!</div>"
		data : function () {
			return {a:1}
		}
	})
```
同理，`el` 选项用在 `Vue.extend()` 中时也须是一个函数。

#### Props
组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件。
`props`是组件数据的一个字段，期望从父组件传下来。子组件需要显式地用`props`选项声明`props`，同时可以用 v-bind 动态绑定 props 的值到父组件的数据中。每当父组件的数据变化时，该变化也会传导给子组件：
```html
<div id="app">
    <div>
      <input v-model="parentMsg">
      <br>
      <child v-bind:message="parentMsg"></child>
    </div>
</div>
<script>
Vue.component('child', {
  // 声明 props
  props: ['message'],
  template: '<span>{{ message }}</span>'
})
// 创建根实例
new Vue({
  el: '#app',
  data: {
    parentMsg: '父组件内容'
  }
})
</script>
```
子组件中：`props:['key']`  
父组件中：`key：'value'`
从而做到将父组件中的数据传给子组件。注意:`prop`是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。

#### 自定义事件

你现在肯定很想知道，那么子组件怎么把数据给父组件呢？方法就是自定义事件！
使用 `$on(eventName)` 监听事件
使用 `$emit(eventName)` 触发事件
另外，父组件可以在使用子组件的地方直接用 `v-on` 来监听子组件触发的事件。
以下实例中子组件已经和它外部完全解耦了。它所做的只是触发一个父组件关心的内部事件。
```html
<div id="app">
    <div id="counter-event-example">
      <p>{{ total }}</p>
      <button-counter v-on:increment="incrementTotal"></button-counter>
      <button-counter v-on:increment="incrementTotal"></button-counter>
    </div>
</div>
 
<script>
Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
</script>
```
`increment`是自定义事件，`$emit()`触发事件，父组件中`v-on`监听了该事件，并挂载了事件响应程序，当子组件中`increment`事件被触发，父组件能捕捉到并触发对应的响应程序。通过响应程序来改变父组件中的数据，也就是说，最后改变父组件中的数据需要通过父组件中的`methods`，子组件只是通过自定义事件触发了父组件中的响应程序。 而父组件向子组件传递数据则是通过子组件的`props`属性值联系在一起的。