---
title: webpack打包原理
date: 2018-03-20 20:29:14
tags: webpack
---
阅读了 webpack 打包后的文件，对其打包原理做一个简短的理解。

首先新建一个文件夹，执行命令行`npm i webpack`安装 webpack，然后配置`webpack.config.js`
```
module.exports = {
  entry: {
    bundle: './index.js'
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  }
};

```
<!-- more -->
创建 index.js ，内容如下
```
var aText = require("./a.js");
var bText = require("./b.js");
var str = 'This is Moudle Index. I depends (' + aText +') and ('+ bText + ').';
document.write(str);
```
创建 a.js ，内容如下
```
var bText = require("./b.js");
var str = 'This is Moudle A. I depends (' + bText + ').';
module.exports = str;
```
创建 b.js ，内容如下
```
module.exports = "This is Moudle B.";
```
然后在该目录下执行命令行`webpack`，通过阅读生成的 bundle.js ，我模仿它编写了一个更简单的函数
```js
(function(modules) {
  // modules 存储的是模块函数
  // installedModules 存储的是模块对象
  var installedModules = {};
  // 定义 require 函数 
  // require的功能是执行 modules[id] 里的模块函数，并将返回的结果放在 installedModules[id].exports
  function __webpack_require__(moduleId) {
      // 检测当前模块是否已添加，防止重复添加
      if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
      }
      // 创建一个模块对象，用于存放模块相关的信息
      var module = installedModules[moduleId] = {
          i: moduleId, // 模块id
          l: false, // 是否加载完成
          exports: {} // 模块内容
      };
      // 执行模块函数，此时会在 module.exports 添加模块内容
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      // 标记模块加载完成
      module.l = true;
      // 返回模块内容
      return module.exports;
  }
  return __webpack_require__(1);
})([
  /* 0 */
  (function(module, exports) {
      module.exports = "This is Moudle B.";
  }),
  /* 1 */
  (function(module, exports, __webpack_require__) {
      var aText = __webpack_require__(2);
      var bText = __webpack_require__(0);
      var str = 'This is Moudle Index. I depends (' + aText + ') and (' + bText + ').';
      document.write(str);
  }),
  /* 2 */
  (function(module, exports, __webpack_require__) {
      var bText = `__webpack_require__(0)`;
      var str = 'This is Moudle A. I depends (' + bText + ').';
      module.exports = str;
  })
])
```
以上代码与打包后的 bundle.js 具有同样的效果。从中我们可以看出，webpack 会把所有引用到的文件内容作为参数`modules`的内容，并将每个内容标上唯一的id，将`require("./a.js")`之类的引用语句替换为`__webpack_require__(id)`函数。在匿名函数体内会去执行入口文件（index.js）中的代码，并递归调用其中的`__webpack_require__(id)`，从而实现引入所有的项目依赖。
