---
title: vue中computed的实现
date: 2020-10-05 20:18:28
tags: Vue.js
---

vue 中的 computed 属性的值只有当内部依赖的 data 属性变化时才会重新求值，这是怎么做到的呢。假设传入以下 computed ：
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
initComputed 做到的事情是实例化 Watcher 以及将属性挂载到实例上：
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
回顾以下代码，在第一次获取值后，`watcher.lazy`始终为`false`，也就永远不会执行`watcher.evaluate()`，所以这个计算属性永远不会重新求值，一直使用上一次获得的值。
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

### 计算属性的依赖变更如何触发渲染

如果计算属性在模板或 render 函数中被使用，在触发`计算watcher.update()`后，会触发`渲染watcher.update()`，此时取`this.ab`，会得到重新计算后的值。
这里你可以会有一个疑问，怎么保证`渲染watcher.update()`在`计算watcher.update()`后执行呢，因为如果在之前执行得到的`this.ab`会是旧值（因为此时`watcher.dirty`还为`false`）。这涉及到全局的 `Dep.target` 状态是用一个栈 `targetStack` 来保存。

假设在 render 函数中使用了`this.ab`：
```js
render () {
  return <div>{this.ab}</div>
}
```
当执行 render 函数时，此时`Dep.target`指向`渲染watcher`，`targetStack = [渲染watcher]`，执行`this.a + 1`，读取到了`this.a`，触发`a`的`get`方法，此时`Dep.target`指向`计算watcher`，`targetStack = [渲染watcher，计算watcher]`，调用`dep.depend()`收集`计算watcher`作为依赖，
```js
// dep.depend()
depend () {
  if (Dep.target) { // 此时`Dep.target`指向`计算watcher`
    Dep.target.addDep(this)
  }
}
```
经历了这样的一个收集的流程后，此时的一些状态：
```js
// ab 的计算watcher
{
  deps: [ a的dep ],
  dirty: false, // 求值完了 所以是false
  value: 2,
  getter: ƒ ab(),
  lazy: true
}
```
```js
// a的dep
{
  subs: [ ab的计算watcher ]
}
```
此时求值结束，回到`计算watcher`的`get`方法：
```js
// watcher.get
get () {
  pushTarget(this)
  let value
  const vm = this.vm
  try {
    value = this.getter.call(vm, vm)
  } finally {
    // `计算watcher`出栈，此时`Dep.target`指向`渲染watcher`，`targetStack = [渲染watcher]`。
    popTarget()
  }
  return value
}
```
进入`this.ab`的`getter`函数：
```js
Object.defineProperty(vm, 'ab', { 
  get() {
    if (watcher.dirty) {
      watcher.evaluate()
    }
    if (Dep.target) { // 此时`Dep.target`指向`渲染watcher`
      watcher.depend()
    }
    return watcher.value
  }
})
```
```js
// watcher.depend
depend () {
  let i = this.deps.length
  while (i--) {
    this.deps[i].depend()
  }
}
```
因为 `ab 的计算watcher` 的 deps 里保存了 `a` 的 dep，因此又会调用 `a` 的 `dep.depend()`，会把`渲染watcher` 存放进自身的 subs 中，最后`a`的 dep 如下：
```js
{
  subs: [ ab的计算watcher，渲染watcher ]
}
```

一切初始化已经完成，若改变`a`的值，将触发 `a` 的 `dep.notify`：
```js
notify () {
  const subs = this.subs.slice()
  for (let i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}
```
以上代码依次调用了`计算watcher.update()`和`渲染watcher.update()`，保证`渲染watcher.update()`在`计算watcher.update()`后执行，此时 render 函数中能获取到最新的计算属性的值。

### 总结

* 通过改变`this.dirty`的值来实现缓存，当`this.dirty === true`时，再次访问才会执行`watcher.evaluate()`获得新值。
* 计算属性的依赖变更时触发`计算watcher.update()`，执行`this.dirty = true`，使得再次获取计算属性值时被重新计算。
