---
title: webpack项目优化
date: 2018-04-04 19:12:42
tags: webpack
---
### 提取库文件
#### CommonsChunkPlugin
React、jQuery等库文件很少变化，并且到处被复用，应该被提取出来，并且得到长时间的缓存。
使用插件：[webpack.optimize.CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk)（webpack内建插件）
```js
entry: {
  react: ['react'],
  jquery: ['jquery']
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: ['jquery', 'react'],
    minChunks: Infinity
  })
]
```

<!-- more -->
#### externals
webpack的`externals`配置项规定某些依赖不会被webpack解析，转而从全局变量（引入CDN地址）中去取。
```js
externals: {
    // externals中的key是import中使用的
    // externals中的value是window下调用的
    echarts: 'echarts',
    _: 'lodash'
},
```

### 规定解析文件
webpack的`resolve`配置项规定解析路径，让被`require`或`import`的模块更快地被定位到。
```js
resolve：{
    root: [
        path.resolve('./node_modules')
    ],
}
```

### 代码压缩
使用插件：[UglifyJsPlugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/) （webpack3.0之后不再是内建插件，需要额外下载`npm i -D uglifyjs-webpack-plugin`）
```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  plugins: [
    new UglifyJsPlugin()
  ]
}
```

### 缓存控制
缓存控制需要做到两点：
* 对于没有修改的文件，从缓存中获取
* 对于已经修改的文件，不从缓存中获取

webpack通过给文件名加上版本号（一串哈希值）来实现缓存。当文件没有更新时，哈希值不会被修改，文件名不变；当文件更新时，哈希值改变，文件名也改变，浏览器就会去加载新的文件。
```js
output: {
  path: __dirname + '/dist/'
  // 8 指hash长度为8，默认是16
  filename: "[chunkhash:8].[name].js"
}
```

### 插入引用
由于文件名带上版本号后，每一次文件变化，都需要HTML文件里手动修改引用的文件名，这种工作很琐碎且容错。所以就有了 [ExtractTextPlugin](https://webpack.js.org/plugins/extract-text-webpack-plugin/#options) 和 [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx)

#### 插入css引用
```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
}
```

#### 插入js引用
```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```