---
title: 搬瓦工VPS搭建教程
date: 2018-02-22 22:21:24
tags: other
---
官网提供了[购买服务器的教程](http://www.chexixi.com.cn/gonglue.html)，这里主要讲一下之后的步骤。

### install new os
1. 登录自己账号后点击“Services”中的“My Services”，进入到自己购买的VPS列表，然后点击“KiwiVM Control Panel”进入到管理面板
2. 点击“stop”停止VPS运行，然后点击左侧“Install new OS”进入到系统重装页面
3. 最后选择你要安装的系统版本（见邮件），点击“Reload”进行安装
4. 安装成功后你的邮箱会收到安装成功提示，记下系统重装后的ROOT密码和SSH端口

### Shadowsocks Server
1. 击左侧“Shadowsocks Server”进行安装
2. 点击下方的说明，配置并安装“Shadowsocks Server”
3. 说明文档中**标黄**的部分是需要手动输入的参数，必须一致