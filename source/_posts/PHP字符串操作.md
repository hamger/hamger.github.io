---
title: PHP字符串操作
date: 2017-04-09 10:09:22
tags: PHP
---
## 定义字符串
PHP中定义字符串有三种方式(其中单引号和双引号的区别请详见[这里](https://hamger.github.io/2017/03/27/PHP%E5%8D%95%E5%8F%8C%E5%BC%95%E5%8F%B7%E5%8C%BA%E5%88%AB/))：
* 单引号 `$hello = 'hello world';`
* 双引号 `$hello = "hello world";`
* heredoc语法结构
```php
$hello = <<<TAG
hello world
TAG;
```

## 操作字符串
方法 | 功能 
--- | ---- 
. | 连接字符串 
trim()/rtrim()/ltrim() | 去除（两边/右边/左边）空格 
strlen()/mb_strlen() | 获取字符串/中文字符串长度
substr($str,start,howmany）| 截取字符串
md_substr($str,start,howmany,'utf8'）| 截取中文字符串
strpos(要处理的字符串, 要定位的字符串, [定位的起始位置) | 返回要定位的字符串索引
str_replace(被替换的字符串, 替换的字符串, 被搜索的字符串, [替换进行计数]) | 替换字符串（区分大小写）
sprintf(格式, 要转化的字符串) | 格式化字符串 
implode(分隔符[可选], 数组) | 把数组元素合并为一个字符串
explode(分隔符[可选], 字符串) | 把一个字符串分隔为数组元素
addslashes() | 转义字符串

<!-- more -->
```php
$str = "what's your name?";
echo addslashes($str); // what\'s your name?

$arr = array('Hello', 'World!');
$result = implode(' ', $arr);
print_r($result); // Hello World!

$result2 = explode(' ', $result);
print_r($result2); // Array ( [0] => Hello [1] => World! )

$str2 = '99.9';
$result3 = sprintf('%01.2f', $str2);
echo $result3; // 99.90
```




