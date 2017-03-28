---
title: PHP单双引号区别
date: 2017-03-27 23:09:21
tags: PHP
---
* 单引号内字段不进行解释，直接输出。
* 双引号内字段会经过编译器解释，然后再当作HTML代码输出。

双引号内部变量会解析,单引号则不解析。
```php
$abc = 'my name is Tom';
echo $abc; //结果是:my name is Tom
echo '$abc'; //结果是:$abc
echo "$abc"; //结果是:my name is Tom
```

建议 PHP 引号使用原则：
1. 纯字符串用单引号。
2. 包含变量时用双引号。
3. 包含特殊符号(如换行符\n)时用双引号。