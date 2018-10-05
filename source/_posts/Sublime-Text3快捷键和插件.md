---
title: Sublime Text3快捷键和插件
date: 2017-03-28 09:08:30
tags: Sublime
---
Sublime Text3 是一款很好用的编辑器，想要优雅地使用它，知道部分快捷键和插件是必须的。

### 常用快捷键
快捷键 | 描述
--- | -----
control + - | 回到上一个光标
control + shift + - | 回到下一个光标
control + cdm + ↑/↓ | 移动当前行代码
control + option + t | 交换选中的两部分代码
cmd + option + [ | 折叠选中的代码
cmd + option + ] | 展开选中的代码
shift + cmd + p |	打开命令面板
control + `	| 打开控制台
cmd + n	| 新建标签
cmd + 1/2/3...	| 标签切换
cmd + option + 2 | 分成两屏
cmd + delelte | 删除本行光标前的所有字符
cmd + shift + ↑/↓ | 选中光标上下代码
cmd + f	| 查找
option + cmd + f |	查找替换
cmd + t | 跳转到指定文件
control + g	| 跳转到指定行
cmd + r	| 跳转到指定函数
cmd + l | 选中当前行
cmd + / | 注释当前行或注释选中代码
cmd + option + / | 产生注释代码或注释选中代码
cmd + k + b | 开关侧边栏

<!-- more -->
###  包管理器
下载插件之前，你需要先添加 Package Control 
安装过程: 使用快捷键 control + ` 或者菜单栏选择 View > Show Console
* Sublime Text3 在控制台输入
```bash
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```
* Sublime Text2 在控制台输入
```bash
import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')
```

### 推荐插件
插件 | 描述
---- | ------
Emmet | 大名鼎鼎，大大提高开发效率
BracketHighlighter | 高亮显示匹配的括号、引号和标签
HTML-CSS-JS Prettify | node.js环境下，代码格式化(cmd + shift + h)
ColorPicker | 调色盘(cmd+shift+c)
SideBarEnhancements | 侧边栏增强
sublime tmpl | 快速模板(control+option+h/c/j/p)