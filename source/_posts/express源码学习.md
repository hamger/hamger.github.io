---
title: Express源码学习
date: 2019-03-16 10:07:10
tags: Node.js
---

打开 [Express4 的源码](https://github.com/expressjs/express)，目录结构很清晰，阅读时建议对照源码。

```
. lib
├── middleware  -------------- 中间件
    ├── init.js   ------------ 增强 req 对象和 res 对象
    └── query.js  ------------ 添加 req.query
├── router  ------------------ 路由
    ├── index.js  ------------ Router 构造器
    ├── layer.js  ------------ 中间件和路由的抽象
    └── route.js  ------------ 实现 router.route
├── application.js  ---------- app 对象拓展
├── express.js  -------------- 项目入口
├── request.js --------------- req 对象拓展
├── response.js  ------------- res 对象拓展
├── utils.js  ---------------- 工具集
└── view.js  ----------------- 模板引擎
```

### 底层原理

Express 框架建立在 node.js 内置的 http 模块上，http 模块生成服务器的原始代码如下。

```js
var http = require("http");

var app = http.createServer(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world!");
});

app.listen(3000, "localhost");
```

Express 代理了`http.createServer(requestHandler)`中的`requestHandler`，并使用注册后的中间件和路由，匹配响应传来的用户请求。

<!-- more -->

### 代码梳理

下面是一个简单的 Express 使用案例。

```js
var express = require("express");
// first step
var app = express();

// second step
app.get("/", function(req, res) {
  res.send("Hello world!");
});

// third step
app.listen(3000);
```

#### third step

app.listen 方法在 `application.js` 中被定义。

```js
// application.js
app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

启动一个服务，并指定监听端口，这里的关键是`http.createServer(this)`中的`this`（也就是`app`），即`http.createServer(requestHandler)`中的`requestHandler`，`this`应该是一个函数`(request, response) => {}`，下面介绍 express 如何改造这个函数。

#### first step

express 方法就是 `express.js` 中的 createApplication 方法，该方法返回了一个函数，即`requestHandler`。

```js
// express.js
var proto = require("./application");
var req = require("./request");
var res = require("./response");

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
  });

  // 暴露增强后的 res 对象，会在 middleware/init.js 中被用到
  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  });
  // app.init 内部调用 app.defaultConfiguration ，初始化配置项
  app.init();
  return app;
}
```

#### second step

app.get 方法在 `application.js` 中被定义。

```js
// application.js
var methods = require("methods");
var Router = require("./router");
var middleware = require("./middleware/init");
var query = require("./middleware/query");

methods.forEach(function(method) {
  app[method] = function(path) {
    if (method === "get" && arguments.length === 1) {
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
    this._router = new Router({
      caseSensitive: this.enabled("case sensitive routing"),
      strict: this.enabled("strict routing")
    });

    this._router.use(query(this.get("query parser fn")));
    this._router.use(middleware.init(this));
  }
};
```

在`router/index.js`中定义了`proto.use`方法， 这是`app.use`的实质。

```js
// router/index.js
var Layer = require("./layer");

proto.use = function use(fn) {
  // ... 省略部分代码
  for (var i = 0; i < callbacks.length; i++) {
    var fn = callbacks[i];
    var layer = new Layer(
      path,
      {
        sensitive: this.caseSensitive,
        strict: false,
        end: false
      },
      fn
    );
    layer.route = undefined;
    // 将 layer 对象推入 stack 中管理
    this.stack.push(layer);
  }

  return this;
};
```

一个 Layer 对象包含一个路径和回调，它会把路径正则表达式化，在响应请求时用来匹配路径。在`app.lazyrouter`方法里添加了一个中间件`middleware.init(this)`，重新设置了 req 和 res 的原型，增加了许多方法，详见`request.js`和`response.js`。

```js
// request.js
var req = Object.create(http.IncomingMessage.prototype);
```

```js
// response.js
var res = Object.create(http.ServerResponse.prototype);
```

```js
// middleware/init.js

exports.init = function(app) {
  return function expressInit(req, res, next) {
    if (app.enabled("x-powered-by")) res.setHeader("X-Powered-By", "Express");
    req.res = res;
    res.req = req;
    req.next = next;

    setPrototypeOf(req, app.request);
    setPrototypeOf(res, app.response);

    res.locals = res.locals || Object.create(null);

    next();
  };
};
```

#### 响应请求阶段

1. app.handle 实质上是调用了自身 router 的 handle
2. router.handle 遍历 router 维护的 stack 数组，找到匹配路径的 layer 对象。对于中间件 layer（layer.route 为 undefined），匹配成功后就执行中间件函数；对于路由 layer（layer.route 不是 undefined），匹配成功后还需要匹配 http method 才能执行路由函数。

```js
// router/index.js
proto.handle = function handle(req, res, out) {
  var self = this;

  var idx = 0;
  var protohost = getProtohost(req.url) || "";
  var removed = "";
  var slashAdded = false;
  var paramcalled = {};

  // store options for OPTIONS request
  // only used if OPTIONS request
  var options = [];

  // middleware and routes
  var stack = self.stack;

  // manage inter-router variables
  var parentParams = req.params;
  var parentUrl = req.baseUrl || "";
  var done = restore(out, req, "baseUrl", "next", "params");

  // setup next layer
  req.next = next;

  // for options requests, respond with a default if nothing else responds
  if (req.method === "OPTIONS") {
    done = wrap(done, function(old, err) {
      if (err || options.length === 0) return old(err);
      sendOptionsResponse(res, options, old);
    });
  }

  // setup basic req values
  req.baseUrl = parentUrl;
  req.originalUrl = req.originalUrl || req.url;

  next();

  function next(err) {
    // ... 在下面介绍
  }
};
```

next 函数内部有个 while 循环，每次循环都会从 stack 中拿出一个 layer，这个 layer 中包含了路由和中间件信息，然后就会用 layer 和请求的 path 进行匹配，如果匹配成功就会执行 layer.handle_request，调用中间件函数。但如果匹配失败，就会循环下一个 layer 对象。

```js
// router.js/index.js
// ... 省略部分代码
function next(err) {
  // 拿到当前的访问路径
  var path = getPathname(req);

  // find next matching layer
  var layer;
  var match;
  var route;

  while (match !== true && idx < stack.length) {
    layer = stack[idx++];

    // 进行路径匹配，匹配返回 true，不匹配返回 false
    match = matchLayer(layer, path);
    route = layer.route;

    if (match !== true) {
      continue;
    }

    if (!route) {
      // 正常处理非路由中间件
      continue;
    }

    var method = req.method;
    var has_method = route._handles_method(method);

    // build up automatic options response
    if (!has_method && method === "OPTIONS") {
      appendMethods(options, route._options());
    }

    // don't even bother matching route
    if (!has_method && method !== "HEAD") {
      match = false;
      continue;
    }
  }
  // ... 省略部分代码
  // this should be done for the layer
  if (err) {
    layer.handle_error(err, req, res, next);
  } else {
    layer.handle_request(req, res, next);
  }
}
```

#### 路由中间件的 next 函数

路由中间件的 next 函数比较简单，因为它只负责传递多个中间件（这些中间件都已经使用 app.use 注册在同一个路由下）的控制权，如果调用 next("route")，则会跳过当前路由的其它中间件，直接将控制权交给下一个路由。

```js
// router/route.js
function next(err) {
  // signal to exit route
  if (err && err === "route") {
    return done();
  }

  // signal to exit router
  if (err && err === "router") {
    return done(err);
  }

  var layer = stack[idx++];
  if (!layer) {
    return done(err);
  }

  if (layer.method && layer.method !== method) {
    return next(err);
  }

  if (err) {
    layer.handle_error(err, req, res, next);
  } else {
    layer.handle_request(req, res, next);
  }
}
```

`next(err)`将控制权传递到错误处理中间件，当调用`next(err)`时，实质是调用`layer.handle_error`，如果 fn 的参数不足 4 个，认为不是一个标准的错误处理中间件，则继续调用`next(err)`，直到参数达到 4 个，执行错误处理中间件。

```js
// router/layer.js
Layer.prototype.handle_error = function handle_error(error, req, res, next) {
  var fn = this.handle; // 中间件函数

  if (fn.length !== 4) {
    return next(error);
  }

  try {
    fn(error, req, res, next);
  } catch (err) {
    next(err);
  }
};
```
