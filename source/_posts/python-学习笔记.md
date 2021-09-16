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