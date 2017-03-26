---
title: PHP基础
date: 2017-03-26 12:36:17
tags: PHP
---
PHP（全称：Hypertext Preprocessor，即：超文本预处理器"）是一种在服务器上执行的通用开源脚本语言。作为一位 PHP 初学者，决定将一些知识点记录下来。

## 变量与常量
### 变量
变量以 $ 符号开始，后面跟着变量的名称。
变量名必须以字母或者下划线字符开始，只能包含字母数字字符以及下划线。
PHP变量名和语句一样都是区分大小写的。
PHP 有四种不同的变量作用域：local、global、static、parameter。
global 关键字用于在函数内部访问全局变量。
```php
<?php
$x=5;
$y=10;

function myTest()
{
global $x,$y;
$y=$x+$y;
}

myTest();
echo $y; // 输出 15
?>
```
<!-- more -->
当一个函数完成时，它的所有变量通常都会被删除。然而，有时候希望某个局部变量不要被删除。
static 关键字用于使被标记的变量不被删除。
```php
<?php
function myTest()
{
static $x=0;
echo $x;
$x++;
}

myTest();
myTest();
myTest();
?>
```
### 超级全局变量
超级全局变量（superglobals）在PHP 4.1.0之后被启用, 是PHP系统中自带的变量，在一个脚本的全部作用域中都可用。
PHP 超级全局变量列表如下:
* $GLOBALS  一个包含了全部变量的全局组合数组，变量的名字就是数组的键。
* $_SERVER  一个包含了诸如头信息(header)、路径(path)等信息的数组。
* $_REQUEST  用于收集HTML表单提交的数据。
* $_POST  应用于收集表单数据，在form标签的指定属性："method="post"。
* $_GET  应用于收集表单数据，在form标签的指定属性："method="get"。
* $_FILES
* $_ENV
* $_COOKIE
* $_SESSION

### 常量 
一个常量由英文字母、下划线、和数字组成,但数字不能作为首字母出现。常量名不需要加 $ 修饰符。常量在定义后，默认是全局变量。
设置常量，使用 define() 函数，函数语法如下：
```php
bool define ( string $name , mixed $value [, bool $case_insensitive = false ] )
```
该函数有三个参数:
* name：必选参数，常量名称，即标志符。
* value：必选参数，常量的值。
* case_insensitive ：可选参数，如果设置为 TRUE，该常量则大小写不敏感。默认是大小写敏感的。

## echo 和 print 语句
两者都是语言结构，输出的字符串可以包含 HTML 标签。
echo 和 print 区别:
* echo 可以输出一个或多个字符串
* print 只允许输出一个字符串，返回值总为 1

提示：echo 输出的速度比 print 快， echo 没有返回值，print有返回值1。

## 函数
PHP中的函数不支持重载，并且函数名不区分大小写。
任何的默认参数应该放在任何的非默认参数的** 右侧 **。
自PHP5起，默认值可以通过引用传递。
从函数返回一个引用，必须在函数声明和指派返回值给一个变量时都使用引用运算符 & ：
```php
<?php
function & returns_reference ()
{
    return $someref ;
}

$newref =& returns_reference ();
?>
```
### 可变函数
PHP 支持可变函数的概念。这意味着如果一个变量名后有圆括号，PHP 将寻找与变量的值同名的函数，并且尝试执行它。
```php
<?php
function  foo () {
    echo  "In foo()<br />\n" ;
}

function  bar ( $arg  =  '' ) {
    echo  "In bar(); argument was ' $arg '.<br />\n" ;
}

$func  =  'foo' ;
$func ();         // This calls foo()

$func  =  'bar' ;
$func ( 'test' );   // This calls bar()
?>
```
