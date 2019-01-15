---
title: vuex工作原理
date: 2019-01-14 11:03:07
tags: Vue.js
---

vuex 中的 store 本质就是没有 template 的隐藏着的 vue 组件。

vuex 仅仅是作为 vue 的一个插件而存在，不像 Redux、MobX 等库可以应用于所有框架，vuex 只能使用在 vue 上，很大的程度是因为其高度依赖于 vue 的 computed 依赖检测系统以及其插件系统。

每一个 vue 插件都需要有一个公开的 install 方法，在 vuex 的 函数中调用了 applyMixin 方法，该方法在所有组件的 beforeCreate 生命周期注入了设置 this.\$store 对象。

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

在 Vuex.Store 这个构造函数中，有一个 resetStoreVM(this, state)

```js
// src/store.js
function resetStoreVM(store, state, hot) {
  // 省略无关代码
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  });
}
```

从上面的代码可以看出，其本质就是将我们传入的 state 作为一个隐藏的 vue 组件的 data，也就是说，我们的 commit 操作，本质上其实是修改这个组件的 data 值。
