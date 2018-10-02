---
title: 搭建iOS开发环境
date: 2018-03-17 13:14:58
tags: ReactNative
---
学习 ReactNative 的第一步就是搭建开发环境，在搭建iOS开发环境中就遇到不少坑，以下假定你已经安装了node和Xcode。

### 安装 Yarn 和 React Native 命令行工具
```
npm install -g yarn react-native-cli
```
设置yarn的镜像源
```
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

这时可能会报错`EACCES: permission denied`，解决方法是修复/usr/local目录的所有权：
> sudo chown -R \`whoami\`  /usr/local

安装完yarn之后就可以用yarn代替npm了，例如用`yarn`代替`npm install`命令，用`yarn add 某第三方库名`代替`npm install --save 某第三方库名`。

<!-- more -->
### 运行ios项目
```
react-native init MyApp --version 0.44.3
cd MyApp
react-native run-ios
```
这时你可能会遇到这个报错`xcrun: error: unable to find utility "instruments", not a developer tool or in PATH`，
解决方法是在终端运行：
> sudo xcode-select -s /Applications/Xcode.app/Contents/Developer/

之后还可能iOS运行再次出错`No bundle URL present`,
解决方法是：**关闭vpn！**。

当 iOS Simulator（ios 模拟器）中显示`Welcome to React Native!`，恭喜你，历经种种磨难，终于成功启动了项目!

### 修改项目
* 打开项目根目录下的`index.ios.js`，然后随便改上几行。
* 在iOS Simulator中按下⌘-R，就能看到你的修改！
* 在 Simulator 中按下 ⌘+D 可打开开发者菜单。