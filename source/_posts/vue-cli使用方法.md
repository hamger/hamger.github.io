---
title: vue-cli使用方法
date: 2018-01-07 12:38:58
tags: Vue.js
---
### 安装 vue-cli
使用`npm install vue-cli -g`来安装或者更新`vue -cli`。
### 初始化项目
`vue init 模板名称 项目名称`
这里的模板名称官方提供5种：`webpack`、`webpack-simple`、`browserify`、`browserify-simple`、`simple`。
项目名称自己取，**不需要加引号**，**不能大写**。
创建好项目后`npm install`下载依赖，然后`npm run dev`启动项目。
<!-- more -->
### 项目目录

```
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|-- src                              // 源码目录
|   |-- components                   // vue 公共组件
|   |-- store                        // vuex 的状态管理
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
```