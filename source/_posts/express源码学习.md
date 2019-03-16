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

### express.js
```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello world!');
});

app.listen(3000);
```
app.listen 方法在 application.js 中。
```js
// application.js
app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```
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
  mixin(app, proto, false);

  // expose the prototype that will get set on requests
  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  // expose the prototype that will get set on responses
  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  app.init();
  return app;
}
```