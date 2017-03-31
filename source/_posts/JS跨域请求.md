---
title: JS跨域请求
date: 2017-03-30 18:34:06
tags: JavaScript
---
跨域是由浏览器的同源策略引起的，即不同源（协议,域名,端口中其中有一个不同）的js是不能读取对方的资源的。限制跨域是浏览器的行为，而不是JS的行为。要实现跨域请求，解决方法大致分为两类：
* 一类是Hack，比如通过 title , navigation 等对象传递信息，JSONP可以说是一个最优秀的Hack。
* 另一类是HTML5支持，一个是 `Access-Control-Allow-Origin` 响应头，一个是 window.postMessage 。

## document.domain
原理：相同主域名不同子域名下的页面，可以设置 document.domain 让它们同域。
限制：同域document提供的是页面间的互操作，需要载入iframe页面。

<!-- more -->
## JSONP
原理：`<script>`是可以跨域的，而且在跨域脚本中可以直接回调当前脚本的函数。
限制：需要创建一个DOM对象并且添加到DOM树，只能用于GET方法。
跨域URL返回的脚本不仅包含数据，还包含一个回调：
```js
// URL: http://b.a.com/foo
var data = {
    foo: 'bar',
    bar: 'foo'
};
callback(data);
```
在主站`http://a.com`中，可以这样来跨域获取`http://b.a.com`的数据：
```js
// URL: http://a.com/foo
var callback = function(data){
    // 处理跨域请求得到的数据
};
var script = $('<script>', {src: 'http://b.a.com/bar'});
$('body').append(script);
```
其实jQuery已经封装了JSONP的使用，我们可以这样来：
```js
$.getJSON( "http://b.a.com/bar?callback=callback", function( data ){
    // 处理跨域请求得到的数据
});
```

## CORS
原理：服务器设置 `Access-Control-Allow-Origin` HTTP响应头之后，浏览器将会允许跨域请求。
限制：浏览器需要支持HTML5， 可以支持POST，PUT等方法。
前面提到的跨域手段都是某种意义上的Hack， HTML5标准中提出的跨域资源共享（Cross Origin Resource Share，CORS）才是正道。 它支持其他的HTTP方法如PUT, POST等，可以从本质上解决跨域问题。

## window.postMessage
原理：HTML5允许窗口之间发送消息。
限制：浏览器需要支持HTML5，获取窗口句柄后才能相互通信。

