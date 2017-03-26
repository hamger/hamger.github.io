---
title: Mac下速查文件
date: 2017-03-26 18:26:17
tags: other
---
对于用 Mac 的小伙伴来说，这是一个非常实用的技能，我花了些时间研究了下，现在写下我的心得。
网上一查，主要有两种方法，首先请打开你的终端。

#### 通过Find命令搜索文件
find命令来自unix，OS X 和 Linux 系统同样支持该命令。find最基本的语法是：
```
find 文件路径 选项 目标文件
```
比如你可以通过以下命令全局搜索名字是 php.ini 的文件:
```
find / -name  "php.ini"
```
也可以在指定的文件夹中查找以 php 开头的文件：
```
find ~/Library/ -name "php*"
```

#### 通过mdfind命令搜索文件
mdfind命令就是Spotlight功能的终端界面，mdfind命令非常迅速。最基本的使用方法是：
```
mdfind -name 文件名 
```
和find一样请务必加上 -name 选项，不加就会搜出一大堆文件。

我亲自试了一下这两个方法，速度上 mdfind 快 find 几条街，所以强烈推荐使用 mdfind 。但是使用`mdfind -name 文件名`和你用Spotlight终端一样是无法搜索被隐藏的文件的。如果你需要搜索隐藏文件，请在终端输入`sudo mdfind -name 文件名`。