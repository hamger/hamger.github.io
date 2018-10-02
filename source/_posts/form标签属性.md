---
title: form标签属性
date: 2018-02-15 14:25:00
tags: HTML
---
`<form>`标签用于为用户输入创建 HTML 表单。表单能够包含 input 元素，如文本字段、复选框、单选框、提交按钮等。表单还可以包含 menus、textarea、fieldset、legend 和 label 元素。

属性 | 值 | 描述
--- | --- | ---
action | String | 规定当提交表单时向何处发送表单数据
method | `get/post` | 规定用于发送 form-data 的 HTTP 方法
name | String | 规定表单的名称，一般不设置
autocomplete | `on/off` | H5属性，规定是否启用表单的自动完成功能
novalidate	| `novalidate` | H5属性，如果使用该属性，则提交表单时不进行验证
target	| 见下方说明 | 规定在何处打开 action 的 URL
enctype	| 见下方说明 | 规定在发送表单数据之前如何对其进行编码

### target 可能的值
* `_blank`：指定action的Url在新开的浏览器窗口中
* `_parent`：指定action的Url在父级浏览器窗口中
* `_self`：指定action的Url在当前浏览器窗口中
* `_top`：指定action的Url在顶级浏览器窗口中
* framename：指定action的Url在指定的 iframe 中打开

利用 target 可以实现表单提交不刷新，让 form 表单的 target 属性等于 iframe 的 name 属性
```
<form action="http://localhost:8085/api/uploadimg" method="POST" enctype="multipart/form-data" target="nm_iframe">
  <input type="file" name="imgfile" multiple>
  <input type="submit" value="提交">
</form>
<iframe name="nm_iframe" style="display:none;"></iframe>
```

### enctype 可能的值
* `application/x-www-form-urlencoded`: 默认，在发送前编码所有字符（空格转换为`+`加号，特殊符号转换为 ASCII HEX 值）
* `multipart/form-data`: 不对字符编码，在使用包含文件上传控件的表单时，必须使用该值
* `text/plain`: 空格转换为`+`加号，但不对特殊字符编码