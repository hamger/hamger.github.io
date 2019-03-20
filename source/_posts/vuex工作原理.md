---
title: vuex工作原理
date: 2019-01-14 11:03:07
tags: Vue.js
---

vuex 中的 store 本质就是没有 template 的隐藏着的 vue 组件，所有配置的 state、actions、mutations 以及 getters 都是其组件的属性，所有的操作都是对这个组件进行的。

vuex 仅仅是作为 vue 的一个插件而存在，不像 Redux、MobX 等库可以应用于所有框架，vuex 只能使用在 vue 上，很大的程度是因为其高度依赖于 vue 的 computed 依赖检测系统以及其插件系统。

每一个 vue 插件都需要有一个公开的 install 方法，vuex 的 install 方法中调用了 applyMixin 方法，该方法在组件的 beforeCreate 生命周期中混入了一个操作：在实例上挂载了一个`$store`属性指向`store`对象。

```js
// src/store.js
import applyMixin from "./mixin";

export function install(_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[vuex] already installed. Vue.use(Vuex) should be called only once."
      );
    }
    return;
  }
  Vue = _Vue;
  applyMixin(Vue);
}
```

<!-- more -->

```js
// src/mixins.js
// 对应 applyMixin 方法
export default function(Vue) {
  const version = Number(Vue.version.split(".")[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    const _init = Vue.prototype._init;
    Vue.prototype._init = function(options = {}) {
      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit() {
    const options = this.$options;
    // store injection
    if (options.store) {
      this.$store =
        typeof options.store === "function" ? options.store() : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}
```

我们一般像下面这样使用 vuex :

```js
Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules
});
// 此时 store 等于 this.$options.store
new Vue({
  el: "#app",
  store
});
```

在 Vuex.Store 这个构造函数中，会执行`resetStoreVM(this, state)`

```js
// src/store.js
function resetStoreVM(store, state, hot) {
  // 省略无关代码
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  });
}
```

从上面的代码可以看出，其本质就是将我们传入的 state 作为一个隐藏的 vue 组件的 data，也就是说，我们的 commit 操作，本质上是修改这个组件的 data 。
