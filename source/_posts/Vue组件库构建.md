---
title: Vue组件库构建.md
date: 2018-02-16 20:52:01
tags: Vue.js
---
从Vue项目实践中抽离出部分组件，并集合成一个组件库项目，本文会指导你构建一个组件库的开发和发布环境，以及如何编写一个Vue组件。阅读过程中建议结合项目代码[hg-vcompoments](https://github.com/hamger/hg-vcomponents)。

## 搭建项目
为了快速搭建一个项目，我们使用vue-cli（`npm install -g vue-cli`）来创建。
```bash
vue init webpack hg-vcomponents
cd hg-vcomponents
npm install
```
<!-- more -->
### 改造项目结构
使用vue-cli创建的目录结构并不是我们需要的结构，应此需要进行改造，改造后结构如下
```
. hg-vcomponents
├── package.json  --------------------- 项目配置
├── README.md  ------------------------ 说明文件
├── build  ---------------------------- 构建代码文件
├── config  --------------------------- 构建配置文件
├── dist  ----------------------------- 组件打包后代码
├── index.html  ----------------------- 入口页面
└── src  ------------------------------ 源码目录
    └── components  ------------------- 所有组件的目录
        └── HollowArrow  -------------- 某个组件的目录
            ├── hollow-arrow.vue  ----- 组件代码
            └── README.md  ------------ 组件使用说明
        └── index.js  ----------------- 导出所有组件
    ├── examples  --------------------- 组件Demo的目录
        ├── arrows.vue  --------------- 某个组件的Demo
        └── index.vue  ---------------- 所有Demo的入口
    ├── router  ----------------------- vue-router目录
    ├── App.vue  ---------------------- vue根组件文件
    └── main.js  ---------------------- 项目入口文件
```

> src/components/index.js
```js
import HollowArrow from './HollowArrow/hollow-arrow.vue';
export {
  HollowArrow
};
```
> src/examples/index.vue
```html
<template>
  <div>
    <div class="tab"><router-link to="/arrows">箭头组件</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'el-index'
};
</script>
```
> src/router/index.js
```js
import Vue from 'vue';
import Router from 'vue-router';
const Index = () => import('@/examples/index.vue'); // 所有的组件测试案例入口页面
const Arrows = () => import('@/examples/arrows.vue'); // hollow-arrow组件的测试案例
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/arrows',
      name: 'arrows',
      component: Arrows
    },
  ]
});
```

### 开发与生产
通过设置`build/webpack.base.conf.js`，使`build`时打包`components`文件夹里的内容
```js
entry: {
    app: process.env.NODE_ENV === 'production'
      ? './src/components/index.js' // 生产模式下导入文件
      : './src/main.js' // 开发模式下导入文件
},
```
这样设置后使得项目的开发与生产独立开来，使用`npm run dev`进入开发环境，就可以看到组件的demo页面，方便本地调试。使用`npm run build`打包组件库代码。
由于`dist`文件夹下文件是要导出的文件，所以在`.gitignore`文件中记得把`dist/`去掉。

## 编写组件
编写一个Vue组件经常会用到`props`和`slot`。

### props
vue父组件通过`props`向子组件传递数据
```html
<div id="hg-to-top" :style="{height: height}"></div>
...
props: {
  height: {
    type: String,
    default: '30px'
  },
},
```

### slot 
vue父组件通过`slot`向子组件传递`template`
```html
<div id="hg-to-top">
  <slot>
    <span class="hg-to-top-arrows"></span>
  </slot>  
</div>
```
如果父组件中不传入`slot`，默认显示子组件中`slot`标签里的内容。

完整组件代码见[这里](https://github.com/hamger/hg-vcomponents/blob/master/src/components/ToTop/to-top.vue)。

### 测试
开发一个组件的同时会需要进行本地测试，在`examples`下新建`arrows.vue`用来测试组件
```html
<template>
  <div>
    <hollow-arrow :direction="'left'"></hollow-arrow>
  </div>
</template>
<script>
import { HollowArrow } from '@/components';
export default {
  components: {
    HollowArrow
  },
};
</script>
```

## 上传NPM
开发的组件希望被更多的人使用，这时就需要上传NPM。
> 修改`package.json`配置
```json
"private": false, // 因为组件包是公用的，所以 private 为 false
"main": "dist/hg-vcomponents.min.js", // 导出文件名，即 import 引入的文件
```
> 登录npm后，在根目录输入命令
```bash
npm version patch
npm publish
```
现在你可以使用`npm install hg-vconponents`下载自己的组件库了，并通过如下方式引入
```js
import 'hg-vcomponents/dist/hg-vcomponents.min.css';
import { HollowArrow } from 'hg-vcomponents';
```
