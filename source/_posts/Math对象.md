---
title: Math对象
date: 2017-10-22 14:50:48
tags: JavaScript
---
Math 对象用于执行数学任务。Math 对象并不像 Date 和 String 那样是对象的类，因此没有构造函数。

常用方法 | 描述 
----|------
abs(x) | 返回 x 的绝对值
ceil(x) | 对 x 进行上舍入
floor(x) | 对 x 进行下舍入
round(x) | 把数四舍五入为最接近的整数
max(x,y,z,...,n) | 返回 x,y,z,...,n 中的最高值
min(x,y,z,...,n) | 返回 x,y,z,...,n中的最低值
random() | 返回 0 ~ 1 之间的随机数
sqrt(x) | 返回 x 的平方根
pow(x,y) | 返回 x 的 y 次幂的值

其中`max()`和`min()`的参数不能是数组只能是数字，如果要求数组中的极值则可以使用`Math.max.apply(Math, array)`。
