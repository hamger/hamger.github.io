---
title: URL的获取和组装
date: 2017-03-11 21:09:34
tags: JavaScript
---
实际开发中，我们会遇到需要处理当前页面 URL 的问题。

## 获取 URL 参数
```js
var urlPara = （ function() {
    var url = window.document.location.href.toString()
    var urlSlice = url.split('?')
    if (typeof(urlSlice[1]) == 'string') {
        urlSlice = urlSlice[1].split('&')
        var getPara = {}
        var urlPara = []
        for (var i = 0; i < urlSlice.length; i++) {
            urlPara = urlSlice[i].split('=')
            getPara[urlPara[0]] = urlPara[1]
        }
        return getPara
    } else {
        return {}
    }
}）()
```
<!-- more -->
urlPara 是一个存储了 URL 参数的对象，因此通过 urlPara.属性名 就可得到对应的属性值。

## 组装 URL 参数
```js
function assemblyPara(start,urlPara) {
	var url = start
	for(var prop in urlPara){
		url += (prop + '=' + urlPara[prop] + '&')
	}
	return url
}
```

