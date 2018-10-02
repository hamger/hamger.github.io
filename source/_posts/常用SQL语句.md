---
title: 常用SQL语句
date: 2018-02-07 21:01:04
tags: SQL
---
SQL 是用于访问和处理数据库的标准的计算机语言。**SQL 语句不区分大小写**。注意在命名表的时候**不要用MySQL的关键字**（[关键字一览表](https://www.cnblogs.com/wuyifu/p/5949764.html)），否则插入数据的时候就报错。
### SELECT - 从数据库中提取数据
```
// 查询整个表
SELECT * FROM table_name;
// 查询指定列
SELECT column_name, column_name2
FROM table_name;
// 查询作者是 hanger 的文章，并按发布时间降序排序(默认升序 aes)
select * from articles where author = 'hanger' order by publish_time desc`
// "Websites" 表中选取所有网站，并按照 "country" 和 "alexa" 列排序
SELECT * FROM Websites
ORDER BY country,alexa;
// DISTINCT 使查询结果去除重复值
SELECT DISTINCT column_name, column_name
FROM table_name;
// Websites" 表中选取 alexa 排名大于 "15" 且国家为 "CN" 或 "USA" 的所有网站
SELECT * FROM Websites
WHERE alexa > 15
AND (country='CN' OR country='USA');
// 查询前五条数据(limit index, length)
SELECT * FROM Persons
LIMIT 0,5;
```
<!-- more -->

SQL 使用单引号来环绕文本值（大部分数据库系统也接受双引号）。如果是数值字段，请不要使用引号。
下面的运算符可以在 WHERE 子句中使用：

运算符 | 描述
---- | ----
= |  等于
<> | 不等于。注释：在 SQL 的一些版本中，该操作符可被写成 !=
> | 大于
<  | 小于
>= | 大于等于
<= | 小于等于
BETWEEN | 在某个范围内
LIKE |  搜索某种模式
IN | 指定针对某个列的多个可能值

### INSERT INTO - 向数据库中插入新数据
```
// 无需指定要插入数据的列名(按列顺序插入数据)
INSERT INTO table_name
VALUES (value1,value2,value3,...);
// 需要指定列名及被插入的值
INSERT INTO table_name (column1,column2,column3,...)
VALUES (value1,value2,value3,...);
```

### UPDATE - 更新数据库中的数据
```
// 把 "菜鸟教程" 的 alexa 排名更新为 5000，country 改为 USA
UPDATE Websites 
SET alexa='5000', country='USA' 
WHERE name='菜鸟教程';
```
**警告！**在更新记录时要格外小心！在上面的实例中，如果省略了`WHERE`，执行后将`Websites`表中所有数据的`alexa`改为`5000`，`country`改为`USA`！

### DELETE - 从数据库中删除数据
```
// 删除指定行
DELETE FROM table_name
WHERE some_column=some_value;
// 删除表中所有的行，但表结构、属性、索引将保持不变
DELETE FROM table_name;
DELETE * FROM table_name;
```

### CREATE - 创建数据库、表、索引
```
// 创建数据库
CREATE DATABASE dbname;
// 创建 persons 表
CREATE TABLE Persons
(
PersonID int,
LastName varchar(255),
FirstName varchar(255),
Address varchar(255),
City varchar(255)
);
// 在 "Persons" 表的 "LastName"、"FirstName" 列上创建一个名为 "PIndex" 的索引，允许使用重复的值
CREATE INDEX PIndex
ON Persons (LastName, FirstName)
// UNIQUE 在表上创建一个唯一的索引。不允许使用重复的值
CREATE UNIQUE INDEX index_name
ON table_name (column_name)
```
在不读取整个表的情况下，索引使数据库应用程序可以更快地查找数据。更新一个包含索引的表需要比更新一个没有索引的表花费更多的时间，这是由于索引本身也需要更新。因此，理想的做法是仅仅在常常被搜索的列（以及表）上面创建索引。
