---
title: pug模板语法
date: 2017-04-07 15:42:47
tags: pug
---

pug 是 HTML 的模板引擎，原名 jade ，大大简化了 HTML 代码的书写，并且增加了许多功能，代码之间的嵌套关系是统一通过** 空格 **或者** `tab` **来实现的，** 不能两者混合用 **，并且** 1个`tab`不等于4个空格 **，请务必先记住这一点。

## 基础
pug 长这样：
```pug
doctype html  
head  
 meta(charset='utf-8')  
 title my resume  
 style.
  body{background-color:#ABFDBA}
 script.
  var name = 'scoot' 
body 
 - var jade = {source:'jade',level:'high'}
 h2 a frondend enginner #{jade.level} 
 p   
  | Alice  
  | Tom 
  | Hairen 
  a(href='www.baidu.com') baidu 
 .skills  haha
 div.program  lalla
 ul#fruit.fruit
  li aaa
  li bbb
 div: a hahhah 
```
以上代码等价与：
```html
<!DOCTYPE html  >
<head> 
  <meta charset="utf-8"/>
  <title>my resume  </title>
  <style>body{background-color:#ABFDBA}</style>
  <script>var name = 'scoot' </script>
</head>
<body>
  <h2>a frondend enginner high</h2>
  <p>  
    Alice  
    Tom 
    Hairen <a href="www.baidu.com">baidu </a>
  </p>
  <div class="skills"> haha</div>
  <div class="program"> lalla</div>
  <ul class="friuts" id="fruit">
    <li>aaa</li>
    <li>bbb</li>
  </ul>
  <div><a>hahhah </a></div>
</body>
```
<!-- more -->
## 符号
符号 | 含义 
---- | -----
. | 表示之后的内容翻译为纯文本
  :  |  表示嵌套关系，不需要换行
&#124; |  表示之后的内容翻译为纯文本，不识别HTML标签
// | 注释，在编译出来的html中显示
//- | 注释，在编译出来的html中不显示
- | 后接 js 代码
#{变量} | 转义插值
!{变量} | 非转义插值

## 逻辑操作
```pug
 - var list = ['one', 'two','three'] 
 - for (k in list)
  p= list[k] 
 if list 
  if (list.length > 2)
   p lists more than two	
  else if (list.length >= 1)
   p two lists or one list
  else 
   p no list   
 else 
  p no list   
```
输出
```html
<p>one</p>
<p>two</p>
<p>three</p>
<p>lists more than two	</p>
```

## Mixin
minix可以理解为就是在定义一个函数，然后用`+`来调用函数，函数可以进行嵌套。
```bug
 mixin student(name,course)
  p #{name} studing #{course}
 mixin group(obj)
  h2 my name is #{obj.name}
  +student(obj.name,obj.course)
 h1 
  +group({name:'tom',course:'jade'}) 
```
输出：
```html
  <h1> 
      <h2>my name is tom</h2>
        <p>tom studing jade</p>
  </h1>
```

## 模板继承
关键词 | 描述
---- | ----
block | 占位符，通过其实现子模板的追加和替换
extends | 继承，子模板继承父模板中的代码
append | 在子模板中向后追加内容
prepend | 在子模板中向前追加内容
include | 引入文件，并将其中的代码放到模板中

### 实例
例如，父模板如下：
```pug
// layout.jade
doctype html
html
  head
    block scripts
      script(src='jquery.js')
    block styles
  body
    block content
      p there's no content here
```
现在有一个子模板继承了上述父模板
```pug
// page1.jade（假设和layout.jade相同路径）

extends layout // .jade扩展名可以省略

block scripts  
  script(src='react.js')

append scripts
  script(src='underscore.js')

prepend scripts
  script(src='vue.js')  	

block content //内容被替换为空
```
输出如下，留意脚本顺序：
```html
<!DOCTYPE html>
<html>
<head>
    <script src="vue.js"></script>
    <script src="react.js"></script>
    <script src="underscore.js"></script>
</head>
<body>
</body>
</html>
```
### include
include一般用来引入模板间可以复用的代码（比如头部和尾部），实现代码的去冗余。
```pug
doctype html
html
  head
    style(type='text/css')
      include style.css
  body
    include content.html
```

