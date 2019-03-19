---
title: Koa源码学习
date: 2019-03-19 15:07:40
tags: Node.js
---

[Koa2 的源码](https://github.com/koajs/koa) 相当的简短，因为抽离了路由、模板引擎等模块，只提供一个架子，而几乎所有的功能都需要由第三方中间件完成。阅读时建议对照源码。

```
. lib
├── application.js  ---------- 构造 app 对象
├── context.js  -------------- 构造 ctx 对象
├── request.js --------------- 构造 req 对象
└── response.js  ------------- 构造 res 对象
```

底层原理同 express，即代理`http.createServer(requestHandler)`中的`requestHandler`，使用中间件来处理请求。

### 代码梳理

`application.js`中构造了 app 对象，初始化 context 属性 ，定义了 listen、use 等方法。

```js
// ... 省略部分代码
const Emitter = require("events");
const onFinished = require("on-finished");
const response = require("./response");
const compose = require("koa-compose");
const context = require("./context");
const request = require("./request");

class Application extends Emitter {
  constructor() {
    super();
    this.middleware = []; // 存放中间件
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
  callback() {
    // 这里的 compose 函数把所有的中间件变成一个函数，后续介绍
    const fn = compose(this.middleware);

    // 调用 Emitter 中的 listenerCount 判断是否有error事件的监听器
    // 如果没有会为 error 事件注册默认的事件监听方法 onerror
    if (!this.listenerCount("error")) this.on("error", this.onerror);
    const handleRequest = (req, res) => {
      // 创建的 ctx 对象，并使 ctx.request = this.request, ctx.response = this.response
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };
    return handleRequest;
  }
  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    // respond 内读取ctx信息，把数据写入 res 中并响应请求
    const handleResponse = () => respond(ctx);
    // onFinished 确保一个流在关闭、完成和报错时都会执行注册的回调函数
    onFinished(res, onerror);
    // fnMiddleware(ctx) 返回一个 Promise
    return fnMiddleware(ctx)
      .then(handleResponse)
      .catch(onerror);
  }
}
```

### compose

`compose`接受一个包含中间件的数组作为参数，返回一个函数，且该函数会返回一个 Promise 。`compose`是 koa 洋葱模型的关键 ，来看一下 koa-compose 的源码。

```js
function compose(middleware) {
  return function(context, next) {
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      // 如果一个中间件内多次调用 next，报错
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      let fn = middleware[i];
      // 运行到最后一个中间件时，调用参数 next
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        // 执行当前中间件，把 ctx 和 next（ 也就是dispatch(i + 1) ）传入，执行 dispatch(i + 1) 就会进入下一个中间件
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}
```

中间件内去调用 `next` 方法就是调用 `dispatch(i + 1)`，即执行下一个中间件（入栈），以此类推执行到最后一个中间件（所有中间件入栈）。当最后一个中间件执行完毕，出栈，然后执行前一个中间件的处理函数，以此类推执行到第一个中间件出栈。这就有了 koa 的洋葱模型。

#### 案例

结合具体案例来看一下，`compose`函数的作用。

```js
var middleware = [
  function foo(ctx, next) {
    console.log("foo1");
    next();
    console.log("foo2");
  },
  function bar(ctx, next) {
    console.log("bar1");
    next();
    console.log("bar2");
  }
];
var fn = compose(middleware);
```

此时 fn 可以视为下面的函数：

```js
function (context) {
  return function () {
    return Promise.resolve(foo(context, bar(context, () => {
      return Promise.resolve()
    })));
  }
}
```

所以当执行`fn(ctx).then(handleResponse).catch(onerror);`时，输出如下：

```js
foo1;
bar1;
bar2;
foo2;
```
