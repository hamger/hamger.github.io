---
title: Mac下命令行
date: 2017-04-02 10:55:57
tags: Mac
---
本博文记录自己用到过 Mac 命令行，会保持更新。

## 关于man命令
在命令行中输入 `man command-name` 会返回一个该条命令的使用指南，非常详细。
使用指南往往很长，可以使用 ▲（上箭头）或 ▼（下箭头）来上下移动，使用空格键来翻页，输入`/`和关键字来搜索，按 Q 退出。

## 目录操作 
命令 | 描述 | 用法 
---- | --- | ----
mkdir | 创建一个目录 | mkdir dir1
rmdir | 删除一个空目录 | rmdir dir1
rm -r | 删除一个目录 | rm -r dir1
mvdir | 移动/重命名一个目录 | mvdir dir1 dir2
cd | 切换到指定目录 | cd dirPath
ls | 显示目录内容 | ls (dir1)
pwd | 显示目录路径 | pwd

## 文件操作
命令 | 描述 | 用法 
---- | --- | ----
> | 创建/覆盖文件 | > file1
>> | 创建/追加文件 | >> file1
cat | 显示文件内容 | cat flie1
more | 分屏显示文件内容 | more file1
cp | 复制文件或目录 | cp file1 file2
rm | 删除一个文件 | rm file1
mv | 移动/重命名一个文件 | mv file1 file2
flie | 显示文件类型 | file fiel1
open | 用默认程序打开文件 | open fiel1
nano | 默认编辑器打开文件 | nano fiel1
vim | 用Vim编辑文件 | vim file1

<!-- more -->
## 在Vim中的命令
命令 | 描述 
---- | --- 
a | 在光标下一个字符处插入
gg | 将光标快速移动到文件首
G | 将光标快速移动到文件尾
0(零) | 将光标快速移动到行首
$ | 将光标快速移动到行尾
/内容 | 查找内容，按n跳到下一项
u | 撤销，回到上一步操作
:行号 | 定位到指定行
:w | 保存
:q | 未保存直接退出
:wq 或 :x | 保存并退出
:wq! 或 :x! | 强制保存并退出
:w! | 强制保存
:q! | 强制退出
:syntax on/off | 开启/关闭语法高亮

## 其他操作
命令 | 描述 | 用法 
---- | --- | ----
sudo | 进入管理员模式('super user do') | sudo -s 
exit | 退出管理员模式 | exit
ps | 显示进程 | ps -u 
kill | 终止进程 | kill -9 30142
clear 或 ctrl+L  | 清屏 | clear 
alias | 给某个命令定义别名 | alias del=rm -i
unalias | 取消对某个别名的定义 | unalias del
find | 查找 | find -name '*.html'
history | 列出最近执行过的（n条）命令 | history (n)
chown | 更改某个目录或文件的用户名和用户组 | chown root:root file1/dir1
chmod | 修改某个目录或文件的访问权限 | chmod [who] [+ &#124;-&#124;=] [mode] file1/dir1
who | 列出当前登入的所有用户 | who
whoami | 列出当前操作的用户 | whoami

## chmod
用来修改某个目录或文件的访问权限。
语法：`chmod [who] [+|-|=] [mode] file1/dir1`
命令中各选项的含义为： 
操作对象 who 可是下述字母中的任一个或者它们的组合：
* u 表示“用户（user）”，即文件或目录的所有者。
* g 表示“同组（group）用户”，即与文件属主有相同组ID的所有用户。
* o 表示“其他（others）用户”。
* a 表示“所有（all）用户”。它是系统默认值。

操作符号可以是：
* `+` 添加某个权限。
* `-` 取消某个权限。
* `=` 赋予给定权限并取消其他所有权限（如果有的话）。

设置 mode 所表示的权限可用下述字母的任意组合：
* r 可读。
* w 可写。
* x 可执行。
* X 只有目标文件对某些用户是可执行的或该目标文件是目录时才追加x 属性。
* s 在文件执行时把进程的属主或组ID置为该文件的文件属主。
* t 保存程序的文本到交换设备上。
* u 与文件属主拥有一样的权限。
* g 与和文件属主同组的用户拥有一样的权限。

