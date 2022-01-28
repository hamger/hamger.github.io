---
title: python 学习笔记
date: 2021-09-13 16:03:38
tags: python
---
### 列表推导式

```python
[表达式 for 迭代变量 in 可迭代对象 [if 条件表达式]]
```

#### 例子
```python
bb = [0] * 3
print(bb)
# [0, 0, 0]

m = range(3)
a_list = [x * x for x in m]
print(a_list)
# [0, 1, 4]

m, n = 3, 4 
dist = [[0] * m for _ in range(n)]
print(dist)
# [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]

zeroes_pos = [(i, j) for i in range(m) for j in range(n)]
print(zeroes_pos)
# [(0, 0), (0, 1), (0, 2), (0, 3), (1, 0), (1, 1), (1, 2), (1, 3), (2, 0), (2, 1), (2, 2), (2, 3)]
print([(i, j) for i in range(m) for j in range(n) if (i + j) % 2 == 0])
# [(0, 0), (0, 2), (1, 1), (1, 3), (2, 0), (2, 2)]
```

### 数字取整

```python
import math
a = 3.5
# 取整整数位
print(int(a))

# 四舍五入
print(round(a))

# 向下取整
print(math.floor(a))

# 向上取整
print(math.ceil(a))
```

> math 包含的方法： https://docs.python.org/zh-cn/3.8/library/math.html

### nums1 = A 和 nums1[:] = A

`nums1 = A`:更改 nums1 这一变量名所指向的对象。让 nums1 变量指向 A 所指向的对象

`nums1[:] = A`:对 nums1 指向的对象赋值。把 A 变量指向的对象的值逐个 copy 到 nums1 指向的对象中并覆盖 nums1 指向的对象的原来值。
