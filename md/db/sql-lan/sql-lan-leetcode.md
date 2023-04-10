# SQL-leetcode
> 本文展示leetcode SQL题目解法
[TOC]
[[TOC]]
## 相关题目
### 1378. [使用唯一标识码替换员工ID](https://leetcode.cn/problems/replace-employee-id-with-the-unique-identifier/)
#### 题目：

难度： `简单`

`Employees` 表：

```text
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
```
id 是这张表的主键。
这张表的每一行分别代表了某公司其中一位员工的名字和 ID 。

`EmployeeUNI` 表：

```text
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| unique_id     | int     |
+---------------+---------+
```
(id, unique_id) 是这张表的主键。
这张表的每一行包含了该公司某位员工的 ID 和他的唯一标识码（unique ID）。


写一段SQL查询来展示每位用户的 唯一标识码（unique ID ）；如果某位员工没有唯一标识码，使用 null 填充即可。

你可以以 任意 顺序返回结果表。

查询结果的格式如下例所示。

eg：

输入：
`Employees` 表:

```text
+----+----------+
| id | name     |
+----+----------+
| 1  | Alice    |
| 7  | Bob      |
| 11 | Meir     |
| 90 | Winston  |
| 3  | Jonathan |
+----+----------+
```

`EmployeeUNI` 表:

```text
+----+-----------+
| id | unique_id |
+----+-----------+
| 3  | 1         |
| 11 | 2         |
| 90 | 3         |
+----+-----------+
```

输出：
```text
+-----------+----------+
| unique_id | name     |
+-----------+----------+
| null      | Alice    |
| null      | Bob      |
| 2         | Meir     |
| 3         | Winston  |
| 1         | Jonathan |
+-----------+----------+
```

解释：

Alice and Bob 没有唯一标识码,因此我们使用 null 替代。

Meir 的唯一标识码是 2 。

Winston 的唯一标识码是 3 。

Jonathan 唯一标识码是 1 。

#### 解:

左外连接 一把梭哈

```sql
SELECT t2.unique_id,t1.name
FROM Employees t1 LEFT OUTER JOIN EmployeeUNI t2
ON  t1.id = t2.id
```



