---
title: vue中computed的实现
date: 2020-10-05 20:18:28
tags: Vue.js
---

vue 中的 computed 属性的值只有当内部依赖的 data 属性变化时才会重新求职，这是怎么做到的呢。假设传入以下 computed ：
```js
computed: {
    ab: function(){
        return this.a + 1;
    }
}
```
以下是 vue 初始化的操作：
```js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
<!-- more -->
initComputed 做到的事情是实例化 Watcher 以及挂载将属性挂载到实例上：
```js
function initComputed (vm: Component, computed: Object) {
  //声明一个watchers，同时挂载到Vue实例上
  const watchers = vm._computedWatchers = Object.create(null)
  //是否是服务器渲染
  const isSSR = isServerRendering()

  //遍历传入的computed
  for (const key in computed) {
    //userDef是computed对象中的每一个方法
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }
    
    //如果不是服务端渲染的，就创建一个Watcher实例
    if (!isSSR) {
      // 关键代码，之后会提到
      watchers[key] = new Watcher( 
        vm,
        getter || noop,
        noop,
        { lazy: true } // 关键参数
      )
    }

    if (!(key in vm)) {
      //如果computed中的key没有在vm中，通过defineComputed挂载上去
      defineComputed(vm, key, userDef) // 关键代码，之后会提到
    } else if (process.env.NODE_ENV !== 'production') {
      //后面都是警告computed中的key重名的
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}
```
可以看到 Watcher 构造器接受了一个参数 `{ lazy: true }`，下边进入 Watcher 介绍该参数起的作用
```js
// 以下为关键代码
export default class Watcher {
    constructor (
        vm: Component,
        expOrFn: string | Function,
        cb: Function,
        options?: ?Object,
        isRenderWatcher?: boolean
    ) {
        this.vm = vm
        vm._watchers.push(this)
        if (options) {
            this.deep = !!options.deep
            this.user = !!options.user
            this.lazy = !!options.lazy
            this.sync = !!options.sync
            1efore = options.before
        } else {
            this.deep = this.user = this.lazy = this.sync = false
        }
        this.dirty = this.lazy // for lazy watchers
        // 此处省略代码...
        // 当 lazy 为 true 时，不计算值，返回 undefined
        this.value = this.lazy ? undefined : this.get()
    }
}
```
此时开头假设的`this.ab`的值为`undefined`，这里可以看到**计算属性在初始化的时候不计算其值**。然后代码执行到`defineComputed(vm, key, userDef)`：
```js
// 以下为关键代码
export function defineComputed (
    target: any,
    key: string,
    userDef: Object | Function
) {
    // 不是服务端渲染就使用环境
    const shouldCache = !isServerRendering()
    if (typeof userDef === 'function') {
        // 处理 userDef 为函数的情况
        sharedPropertyDefinition.get = shouldCache
        ? createComputedGetter(key)
        : createGetterInvoker(userDef)
        sharedPropertyDefinition.set = noop
    } else {
        // 处理 userDef 为对象的情况
        sharedPropertyDefinition.get = userDef.get
        ? shouldCache && userDef.cache !== false
            ? createComputedGetter(key)
            : createGetterInvoker(userDef.get)
        : noop
        sharedPropertyDefinition.set = userDef.set || noop
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}
```
在`createComputedGetter`中用到了`watcher.dirty`，而其初始值由前面传入的参数`{ lazy: true }`决定。
```js
function createComputedGetter (key) {
    return function computedGetter () {
        const watcher = this._computedWatchers && this._computedWatchers[key]
        if (watcher) {
            // watcher.dirty 为 true ，调用 watcher.evaluate()
            if (watcher.dirty) {
                watcher.evaluate()
            }
            if (Dep.target) {
                // 依赖收集，很关键，保证依赖变更时重新求值
                watcher.depend()
            }
            return watcher.value
        }
    }
}
```
然后执行`Object.defineProperty(target, key, sharedPropertyDefinition)`，代码执行到这里其实是把计算属性的 setter 和 getter 创建好了。所以，**计算属性如果未被消费不会计算值**，其值始终是 `undefined`。

当计算属性被用到时（例如在 render 或 methods 中），此时会触发`computedGetter`，进而执行`evaluate`：
```js
function evaluate () {
    this.value = this.get()
    this.dirty = false
}
```
调用`this.get()`会进行依赖收集，最后返回计算属性的值，此时终于获取到了计算属性的值。这里为什么要将`this.dirty`设为`false`呢，是为了实现计算属性基于它的依赖进行缓存的，也就依赖没变时，不重新计算，而是使用缓存。
回顾以下代码，在第一次获取值后，`watch.lazy`始终为`false`，也就永远不会执行`watcher.evaluate()`，所以这个计算属性永远不会重新求值，一直使用上一次获得的值。
```js
if (watcher.dirty) {
    watcher.evaluate()
}
```
那什么时候会重新求值呢，当`watcher.dirty`为`true`时，怎么改变这个值呢，当依赖变更的时候，即在`watcher.update()`中：
```js
update () {
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
}
```
以开头的假设为例，当`this.a`改变时，将触发`dep.notify()`，然后执行该`dep`中所有 `watcher`的`update`方法，其中就包括`this.ab`的`watcher.update()`（这个`watcher`是在前面的`watcher.depend()`中添加的），此时`watcher.dirty`会被改变为`true`，因此当再次取`this.ab`的值时，会重新计算。

如果计算属性在模板或rander函数中被使用，在触发`计算watcher.update()`后，会触发`渲染watcher.update()`，此时取`this.ab`，会得到重新计算后的值。

这里你可以会有一个疑问，怎么保证`渲染watcher.update()`在`计算watcher.update()`后执行呢，因为如果在之前执行得到的`this.ab`会是旧值（因为此时`watcher.dirty`还为`false`）。这涉及到全局的 `Dep.target` 状态是用一个栈 `targetStack` 来保存。

假设在 render 函数中使用了`this.ab`：
```js
render () {
  return <div>{this.ab}</div>
}
```
当执行 render 函数时，此时`Dep.target`指向`渲染watcher`，`targetStack = [渲染watcher]`，当访问`this.ab`时会执行`this.a + 1`，触发`a`的 getter，此时`Dep.target`指向`计算watcher`，`targetStack = [渲染watcher，计算watcher]`。

最后`a`的dep如下：
```js
{
  subs: [ ab的计算watcher，渲染watcher ]
}
```
```js
notify () {
  const subs = this.subs.slice()
  for (let i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}
```
所以保证`渲染watcher.update()`在`计算watcher.update()`后执行。