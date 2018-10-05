---
title: 搭建Android开发环境
date: 2018-03-25 17:59:51
tags: ReactNative
---
学习 ReactNative 的第一步就是搭建开发环境，在搭建Android开发环境中又遇到不少坑，详细安装过程见[这里](https://reactnative.cn/docs/0.51/getting-started.html#content)，以下记录搭建过程中遇到的坑。

### 坑一
运行`react-native run-android`后报错
```bash
* What went wrong:
A problem occurred evaluating project ':app'.  
> SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.
```
解决方法是在`android`目录下创建一个名叫`local.properties`文件，里边的内容如下

* in Windows: `C:/Users/USERNAME/AppData/Local/Android/sdk`
* in macOS: `sdk.dir = /Users/USERNAME/Library/Android/sdk`
* in linux: `sdk.dir = /home/USERNAME/Android/Sdk`

这里的`USERNAME`是你的用户名，然后在终端运行`react-native run-android`。

<!-- more -->
### 坑二
在解决了坑一后，运行`react-native run-android`，你可能会遇到如下错误
```bash
* What went wrong:
Execution failed for task ':app:installDebug'.
> com.android.builder.testing.api.DeviceException: No connected devices!
```
这里的关键信息是`No connected devices!`，意为没有可连接的设备（安卓模拟器）。
所以我们需要开启一个安卓模拟器，我这里用的是 Genymotion ，关于 Genymotion 的下载安装可以看[这篇文章](https://www.cnblogs.com/whycxb/p/6850454.html)。
开启 Genymotion 安卓模拟器后，再次运行`react-native run-android`，如果没有报错，这时app已经在你的安卓模拟器中了，观察模拟器首页你可能看不到，需要到**所有应用程序**中去查找，会有个app的名字是你的项目名！

### 修改项目
* 打开项目根目录下的`index.android.js`，然后随便改上几行。
* 在 Genymotion 模拟器中双击 R 键，就能看到你的修改！
* 在 Genymotion 模拟器中按下 ⌘+M 可打开开发者菜单。