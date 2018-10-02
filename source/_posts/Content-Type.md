---
title: Content-Type
date: 2018-03-13 21:51:33
tags: http
---
在 Http 协议消息头中，使用 Content-Type 来表示具体请求中的媒体类型信息，有如下取值。

> 常见的媒体格式类型

* text/html ： HTML格式
* text/plain ：纯文本格式      
* text/xml ：  XML格式
* image/gif ：gif图片格式    
* image/jpeg ：jpg图片格式 
* image/png：png图片格式
* multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式

<!-- more -->

> 以application开头的媒体格式类型

* application/xhtml+xml ：XHTML格式
* application/xml     ： XML数据格式
* application/atom+xml  ：Atom XML聚合格式    
* application/json    ： JSON数据格式
* application/pdf       ：pdf格式  
* application/msword  ： Word文档格式
* application/octet-stream ： 二进制流数据（如常见的文件下载）
* application/x-www-form-urlencoded ： `<form encType="">`的默认值，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据格式）
