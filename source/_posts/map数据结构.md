---
title: map数据结构
date: 2018-03-01 18:20:26
tags: JavaScript
---
ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
```
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

const map2 = new Map()
  .set('yes', true)
  .set('no', false);
```
Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。
如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如`0`和`-0`就是一个键，布尔值`true`和字符串`true`则是两个不同的键。另外，`undefined`和`null`也是两个不同的键。虽然`NaN`不严格相等于自身，但 Map 将其视为同一个键。

### map实例的属性
* Map.prototype.size 返回map实例的成员总数。

### map实例的操作方法
* set(key, value) set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
* get(key) get方法读取key对应的键值，如果找不到key，返回undefined。
* has(key) has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
* delete(key) delete方法删除某个键，返回true。如果删除失败，返回false。
* clear() clear方法清除所有成员，没有返回值。

<!-- more -->
```
map.set('foo', true)
map.set('bar', false)
map.delete('foo')
map.size // 1
map.clear()
map.size // 0
```

### map实例的遍历方法
* keys() 返回键名的遍历器。
* values() 返回键值的遍历器。
* entries() 返回所有成员的遍历器。
* forEach() 遍历 Map 的所有成员。

需要特别注意的是，Map 的遍历顺序就是插入顺序。
```
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

Map 结构转为数组结构，比较快速的方法是使用扩展运算符`...`。
```
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

### WeekMap
WeakMap 结构与 Map 类似，区别是 WeakMap 只能是**对象**作为**键名**（`null`除外）。注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。WeakMap 键名 里面的引用，都不计入垃圾回收机制。WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。
