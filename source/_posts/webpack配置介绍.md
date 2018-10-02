---
title: webpack配置介绍
date: 2018-03-28 22:34:47
tags: webpack
---
收集了一些日常项目中经常会用到的 webpack 配置，加深对webpack配置的理解。
```js
module.exports = {
    // entry: 打包的入口文件，一个字符串或者一个对象
    entry: {
        bundle: './index.js',
    },
    // output:配置打包的结果，一个对象
    output: {
        // fileName：定义输出文件名，一个字符串
        // path：定义输出文件路径，一个字符串
        path: __dirname,
        filename: '[name].js' // 这里的name就是指 entry 对象的键名，即 bundle
    },
    // module: 定义对模块的处理逻辑，一个对象
    module: {
        // rules: 定义文件加载规则，一个数组
        rules: [{
            test: /\.vue$/, // 正则表达式，用于匹配指定文件
            loader: 'vue-loader', // 加载器名字
            options: vueLoaderConfig, // 传入加载器的参数
            // include: 字符串或者数组，规定需要解析的文件夹
            include: [resolve('src')],
            // exclude：字符串或者数组，规定不需要解析的文件夹
            exclude: [resolve('node_modules')]
        }],
        // loaders: 定义一系列的加载器，一个数组
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }],
    },
    // devtool: 规定一个开发工具来加快调试，字符串
    devtool: 'cheap-module-eval-source-map',
    // resolve: 模块解析的相关配置，一个对象
    resolve: {
        // extensions：自动补全没有后缀的文件，一个数组
        extensions: ['.js', '.vue', '.json'],
        // alias: 设置解析别名，一个对象
        alias: {
            '~': resolve('src/components'), // 配置后使 import('~') 等价于 import('src/components')
        }
    },
    // externals: 规定某些依赖不会被webpack解析，一个对象
    externals: {
        // externals中的key是import中使用的
        // externals中的value是window下调用的
        echarts: 'echarts',
        _: 'lodash'
    },
    // plugins: 定义一系列的插件，一个数组
    plugins: [
        new MyPlugin({name: 'hanger'})
    ]
};
```
更多更详细的介绍在[官方文档](https://www.webpackjs.com/configuration/)。
