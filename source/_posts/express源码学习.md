---
title: express源码学习
date: 2019-03-16 10:07:10
tags: Node.js
---
打开 [express 的源码](https://github.com/expressjs/express)，目录结构很清晰，阅读时建议对照源码。
```
. lib
├── middleware  ------------- 中间件
    ├── init.js   ----------- 初始化
    └── query.js  ----------- 组件使用说明
├── router  ----------------- 路由
    ├── index.js  ------------ 路由入口
    ├── layer.js  ------------ 中间件和路由的抽象
    └── route.js  ------------ router.route 方法
├── application.js  ---------- app
├── express.js  -------------- 项目入口
├── require.js --------------- req 对象增强
├── response.js  ------------- res 对象增强
├── utils.js  ---------------- 工具集
└── view.js  ----------------- 模板引擎
```

### 底层原理
Express 框架建立在 node.js 内置的 http 模块上，http模块生成服务器的原始代码如下。
```js
var http = require("http");

var app = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello world!");
});

app.listen(3000, "localhost");
```
Express 代理了`http.createServer(requestHandler)`中的`requestHandler`，并使用注册后的中间件和路由，匹配响应传来的用户请求。

### 代码梳理
下面是一个简单的 Express 使用案例，记为案例A。
```js
var express = require('express');
// first step
var app = express();

// second step
app.get('/', function (req, res) {
  res.send('Hello world!');
});

// third step
app.listen(3000);
```

#### third step
app.listen 方法在 application.js 中被定义。
```js
// application.js
app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```
启动一个服务，并指定监听端口，这里的关键是`http.createServer(this)`中的`this`（也就是`app`），即`http.createServer(requestHandler)`中的`requestHandler`，`this`应该是一个函数`(request, response) => {}`，下面介绍 express 如何改造这个函数。

#### first step
express 方法就是 express.js 中的 createApplication 方法，该方法返回了一个函数，即`requestHandler`。
```js
// express.js
var proto = require('./application');
var req = require('./request');
var res = require('./response');

function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };
  mixin(app, EventEmitter.prototype, false);
  // 混入 application 中的属性，其中包括 app.handle 、app.init、app.get、app.listen
  mixin(app, proto, false);

  // 暴露增强后的 req 对象，会在 middleware/init.js 中被用到
  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  // 暴露增强后的 res 对象，会在 middleware/init.js 中被用到
  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })
  // app.init 内部调用 app.defaultConfiguration ，初始化配置项
  app.init();
  return app;
}
```

#### second step
app.get 方法在 application.js 中被定义。
```js
// application.js
var methods = require('methods');
var Router = require('./router');
var middleware = require('./middleware/init');
var query = require('./middleware/query');

methods.forEach(function(method){
  app[method] = function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});

// lazily adds the base router if it has not yet been added.
app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    // this._router 继承了 app 的方法
    this._router = new Router({
      caseSensitive: this.enabled('case sensitive routing'),
      strict: this.enabled('strict routing')
    });

    this._router.use(query(this.get('query parser fn')));
    this._router.use(middleware.init(this));
  }
};
```
```js
// router/index.js
```
