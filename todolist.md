更新嵌套的react状态的方案: 通过使用setState()，react 将浅合并我们传递给它的对象，只检查顶级属性，因此修改对象的深层属性无法驱动视图更新，那么如何解决这个问题呢。