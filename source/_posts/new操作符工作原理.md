---
title: new操作符工作原理
date: 2018-02-21 09:10:36
tags: JavaScript
---
```js
// f 为构造函数，o 为创建的对象
function New (f) { 
   /*1*/  
   var o = { '__proto__': f.prototype }; 
   return function () { 
      /*2*/    
      f.apply(o, arguments); 
      /*3*/    
      return o; 
   }; 
}
```
1. 创建对象`o`
2. `o`的`__proto__`属性指向`f`的原型
3. 将`f`内部的`this`指向`o`
4. 返回`o`