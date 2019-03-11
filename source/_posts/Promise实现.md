---
title: Promise实现
date: 2019-03-11 16:33:57
tags: JavaScript
---
首先实现一个基础结构，每一个 Promise 实现，都有状态标识，以及存放成功与失败回调函数的数组。为什么要使用**数组**来存放回调函数呢，是考虑到了下面这种情况。
```js
var p3 = new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve(new Date())
  }, 1000)
)
// 连续调用多次 p3.then ，回调函数需要使用数组来存放
p3.then(v => console.log('a: ' + v))
p3.then(v => console.log('b: ' + v))
```
```js
function Promise (executor) {
  var self = this

  self.status = 'pending' // promise 的状态
  self.onResolvedCallback = [] // 存放成功的回调函数的数组
  self.onRejectedCallback = [] // 存放失败的回调函数的数组

  function resolve (value) {
    // todo
  }

  function reject (reason) {
    // todo
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}
```
`resolve/reject` 负责异步修改 promise 的状态并触发 `onResolvedCallback/onRejectedCallback` 中的回调函数。为什么要**异步**触发呢，是为了保证在触发回调前，所有的回调函数都已经被 then 注册。
```js
function resolve (value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }

  function reject (reason) {
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }
```
接下来，我们需要实现 then 方法，then 方法主要的作用是为实例注册回调函数。
```js
Promise.prototype.then = function (onResolved, onRejected) {
  var self = this
  var promise2
  onResolved =
    typeof onResolved === 'function' ?
      onResolved :
      function (v) {
        return v
      }
  onRejected =
    typeof onRejected === 'function' ?
      onRejected :
      function (r) {
        throw r
      }

  if (self.status === 'resolved') {
    return (promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () { // 保证 then 方法先被执行
        execute(promise2, self.data, onResolved, resolve, reject)
      })
    }))
  }

  if (self.status === 'rejected') {
    return (promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () { // 保证 then 方法先被执行
        execute(promise2, self.data, onRejected, resolve, reject)
      })
    }))
  }

  if (self.status === 'pending') {
    // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容是异步执行的
    return (promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        execute(promise2, value, onResolved, resolve, reject)
      })
      self.onRejectedCallback.push(function (reason) {
        execute(promise2, reason, onRejected, resolve, reject)
      })
    }))
  }
}
// promise2 = promise1.then(onResolved, onRejected)
// 执行回调，并根据返回值决定 promise2 的状态
function execute (promise2, val, callback, resolve, reject) {
  try {
    var x = callback(val)
    resolvePromise(promise2, x, resolve, reject)
  } catch (r) {
    reject(r)
  }
}
```
`onResolved/onRejected`的返回值 x 会有多种情况，如果是 Promise 实例，直接使用 `x.then(resolve, reject)`即可；如果是一个 thenable 对象，尝试去执行对象的 then 方法；如果是原始类型或者非 thenable 对象，直接执行`resolve(x)`。
```js
/*
resolvePromise函数根据 x 的值来决定 promise2 的状态
x为`promise2 = promise1.then(onResolved, onRejected)`里`onResolved/onRejected`的返回值，
`resolve`和`reject`实际上是`promise2`的`executor`的两个实参。
*/
function resolvePromise (promise2, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false

  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  if (x instanceof Promise) {
    x.then(resolve, reject)
    return
  }
  // 处理 thenable 对象
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      then = x.then // because x.then could be a getter
      if (typeof then === 'function') {
        then.call(
          x,
          function rs (y) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return resolvePromise(promise2, y, resolve, reject)
          },
          function rj (r) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      return reject(e)
    }
  } else {
    resolve(x)
  }
}
```
写到这里其实已经实现了 promise 的核心功能了，我们可以写一段代码测试一下了
```js
var p = new Promise(function (resolve) {
  setTimeout(function () {
    resolve(1) // 改变的是 p 的状态
  }, 100)
})
p.then(function foo (value) {
  console.log(value)
  var p2 = new Promise(resolve => {
    setTimeout(function () {
      resolve(value + 2) // 改变的是 p2 的状态
    }, 200)
  })
  return p2
}).then(function foo2 (value) {
  console.log(value)
})
```
执行以上代码会依次输出`1`和`3`, 执行顺序如下：
1. p.then 注册 foo 且返回 x，x.then 注册 foo2 且返回 x2
2. 100ms 后执行`resolve(1)`，p 的状态变更为`'resolved'`并异步执行`foo(1)`，打印出`1`
3. foo 返回 p2 , 由于 p2 是 Promise 实例，执行 p2.then(x_resolve, x_reject) 即注册了 x 的 resolve 函数
4. 200ms 后执行`resolve(value + 2)` ，p2 的状态变更为`'resolved'`并异步执行`x_resolve(3)`
5. x 的状态变更为`'resolved'`并异步执行`foo2(3)`，打印出`3`

### 实例方法
根据已经实现的实例方法 then，可以很容易地实现 catch 和 finally 实例方法。
```js
Promise.prototype.catch = function (onRejected) {
  this.then(null, onRejected)
}
```
finally 里的函数不管状态如何都会被执行，所以只需要成功和失败两种情况各写一次。
```js
Promise.prototype.finally = function (fn) {
  return this.then(
    function (v) {
      setTimeout(fn)
      return v
    },
    function (r) {
      setTimeout(fn)
      throw r
    }
  )
}
```

### 静态方法
#### Promise.resolve & Promise.reject
```js
Promise.resolve = function (value) {
  var promise = new Promise(function (resolve, reject) {
    resolvePromise(promise, value, resolve, reject)
  })
  return promise
}

Promise.reject = function (reason) {
  return new Promise(function (resolve, reject) {
    reject(reason)
  })
}
```
#### Promise.race
`Promise.race`返回一个 promise （记为 r），只要传入的其中一个 promise 状态变为成功时，就执行 r 的 resolve 方法，否则执行 r 的 reject 方法。
```js
Promise.race = function (promises) {
  return new Promise(function (resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        function (value) {
          return resolve(value)
        },
        function (reason) {
          return reject(reason)
        }
      )
    }
  })
}
```
#### Promise.all
`Promise.all`返回一个 promise （记为 a），只有当传入的所有 promise 状态都为成功时，才执行 a 的 resolve 方法，否则执行 a 的 reject 方法。
```js
Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    var resolvedCounter = 0
    var promiseNum = promises.length
    var resolvedValues = new Array(promiseNum) // 存放所有 promise 的执行结果
    for (var i = 0; i < promiseNum; i++) {
      ;(function (i) {
        Promise.resolve(promises[i]).then(
          function (value) {
            resolvedCounter++
            resolvedValues[i] = value
            // 只有当所有 promise 状态都为成功时，才将 a 的状态变更为'resolved'
            if (resolvedCounter === promiseNum) {
              return resolve(resolvedValues)
            }
          },
          function (reason) {
            return reject(reason)
          }
        )
      })(i)
    }
  })
}
```
`Promise.all`存在一个缺陷，只要其中一个 promise 状态为失败，就拿不到其他成功状态的 promise 。现在有一个需求，实现一个 `Promise.alwayResolve(promises)` 方法，总是返回一个成功状态的 promise，返回值为一个存放非 pending 状态的 promises 的数组，只需要改变一下`Promise.all`就可以了。
```js
Promise.alwayResolve = function (promises) {
  return new Promise(function (resolve, reject) {
    var resolvedCounter = 0
    var promiseNum = promises.length
    var resolvedValues = new Array(promiseNum)
    for (var i = 0; i < promiseNum; i++) {
      ;(function (i) {
        Promise.resolve(promises[i]).then(
          function (value) {
            resolvedCounter++
            resolvedValues[i] = value
            if (resolvedCounter === promiseNum) {
              return resolve(resolvedValues)
            }
          },
          function (reason) {
            resolvedCounter++
            resolvedValues[i] = reason
            if (resolvedCounter === promiseNum) {
              return resolve(resolvedValues)
            }
          }
        )
      })(i)
    }
  })
}
```
