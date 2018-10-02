---
title: http中和缓存相关的header
date: 2018-04-09 20:11:00
tags: http
---
HTTP/1.1协议中和网页缓存相关的字段：

header | 解释 | 例子
--- | --- | ---
Expires | 响应过期的日期和时间 | Expires: Thu, 01 Dec 2010 16:00:00 GMT
Cache-Control | 告诉所有的缓存机制是否可以缓存及哪种类型 | Cache-Control: no-cache
Last-Modified | 请求资源的最后修改时间 | Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT
ETag | 请求变量的实体标签的当前值 | ETag: “737060cd8c284d8af7ad3082f209582d”

HTTP/1.0协议中有一个功能比较弱的缓存控制机制：Pragma，使用HTTP/1.0的缓存将忽略`Expires`和`Cache-Control`。
<!-- more -->
#### Expires
`Expires`字段声明了一个网页或URL地址不再被浏览器缓存的时间，一旦超过了这个时间，浏览器都应该联系原始服务器。

#### Cache-Control
`Cache-Control`字段中可以声明多些元素，例如no-cache, must-revalidate, max-age=600(文件被用户访问后的存活时间)等。这些元素用来指明页面被缓存最大时限，如何被缓存的，如何被转换到另一个不同的媒介，以及如何被存放在持久媒介中的。

#### Last-Modified
`Last-Modified`和`ETag`是条件请求(Conditional Request)相关的两个字段。如果一个缓存收到了针对一个页面的请求，它发送一个验证请求询问服务器页面是否已经更改，在HTTP头里面带上`ETag`和`If Modify Since`。服务器根据这些信息判断是否有更新信息，如果没有，就返回HTTP 304（NotModify）；如果有更新，返回HTTP 200和更新的页面内容，并且携带新的`ETag`和`LastModified`。

#### ETag
既然有了`Last-Modified`，为什么还要用`ETag`字段呢？因为如果在一秒钟之内对一个文件进行两次更改，Last-Modified就会不正确。因此，HTTP/1.1利用`Entity Tag`头提供了更加严格的验证。

更多header字段见[这里](https://www.cnblogs.com/Joans/p/3956490.html)