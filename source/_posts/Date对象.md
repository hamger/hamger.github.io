---
title: Date 对象
date: 2017-10-22 13:58:01
tags: JavaScript
---
Date 对象用于处理日期与实际，记录一下它的方法以及传参。

### 常用方法
方法 | 描述 
----|------
getFullYear() | 返回四位数字年份
getMonth() | 返回月份 (0 ~ 11)
getDate() | 返回一个月中的某一天 **(1 ~ 31)**
getHours() | 返回 Date 对象的小时 (0 ~ 23)
getMinutes() | 返回 Date 对象的分钟 (0 ~ 59)
getSeconds() | 返回 Date 对象的秒数 (0 ~ 59)
getDay() | 返回一周中的某一天 (0 ~ 6)
getTime() | 返回 1970 年 1 月 1 日至今的毫秒数

### new Date() 参数
* `new Date("month dd,yyyy hh:mm:ss")` 这里的`month`是一个英文月份单词如`January`
* `new Date("yyyy/MM/dd hh:mm:ss")` 用`/`分隔日期比用`-`等分隔兼容性更好
* `new Date(yyyy, MM, dd, hh, mm, ss)` 参数不能放 Array 类型，且每项必须是 String 或 Number 类型
* `new Date(milliseconds)` 参数必须是 Number 类型

```js
new Date("January 12,2006 22:19:35"); // 注意格式 

new Date("January 12,2006"); // String 类型

new Date("2006/2/2 22:19:35"); // String 类型 

new Date(2006,0,12,22,19,35); // 不能放 Array 类型 

new Date(2006,0,12); // 可以是String 或 Number

new Date(1137075575000); // 必须是 Number 类型
```