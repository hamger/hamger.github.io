---
title: set数据结构
date: 2018-03-01 18:17:55
tags: JavaScript
---
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Set 本身是一个构造函数，用来生成 Set 数据结构。
```
const s = new Set([1, 2, 3, 4, 4]); // [[1, 2, 3, 4]
```
由此可以导出一种简单的数组去重方法
```
function dedupe(arr) {
    return [...new Set(arr)]
}
```
`Array.from`方法可以将 Set 结构转为数组，所以数组去重也可以这么写
```
function dedupe(arr) {
  return Array.from(new Set(arr));
}
```
### set实例的属性
* Set.prototype.size 返回Set实例的成员总数。

### set实例的操作方法
* add(value) 添加某个值，返回 Set 结构本身。
* delete(value) 删除某个值，返回一个布尔值，表示删除是否成功。
* has(value) 返回一个布尔值，表示该值是否为Set的成员。
* clear() 清除所有成员，没有返回值。

<!-- more -->
```
s.add(1).add(2).add(2);
s.size // 2
s.has(1) // true
s.has(2) // true
s.has(3) // false
s.delete(2);
s.has(2) // false
```

### set实例的遍历方法
* keys() 返回键名的遍历器
* values() 返回键值的遍历器
* entries() 返回键值对的遍历器
* forEach() 使用回调函数遍历每个成员

需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
```
let set = new Set([{name: 'red'}, 'green', ['blue', 'yellow']]);

for (let item of set.keys()) {
  console.log(item);
}
// {name: "red"}
// green
// ["blue", "yellow"]

for (let item of set.values()) {
  console.log(item);
}
// {name: "red"}
// green
// ["blue", "yellow"]

for (let item of set.entries()) {
  console.log(item);
}
// [{name: "red"}, {name: "red"}]
// ["green", "green"]
// [["blue", "yellow"], ["blue", "yellow"]]
```

### WeekSet
WeakSet 结构与 Set 类似，区别是 WeakSet 的成员只能是**对象**。WeakSet 里面的引用，都不计入垃圾回收机制，ES6 规定 WeakSet 不可遍历。
