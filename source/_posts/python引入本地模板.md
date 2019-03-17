---
title: python引入本地模块
date: 2018-10-25 15:29:44
tags: pyhton
---

作为新手不熟悉`python`如何引入本地的模块，经过一番折腾，基本明白了引入方式。
假设有一个项目，目录结构如下：

```
. root_dir
├── app.py
└── test
    └── subtest
        ├── __init__.py
        └── hi.py
    ├── __init__.py
    └── hello.py
```

<!-- more -->

```
# hello.py
def hello():
    print('hello world')
```

```
# hi.py
def hi():
    print('hi world')
```

需要在`app.py`中使用`hello()`和`hi()`这两个函数，引入方式如下：

```
# app.py
from test import hello
from test.subtest import hi

hello.hello()
hi.hi()
```
