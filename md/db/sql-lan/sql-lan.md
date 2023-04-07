---
title: SQL语言基础
---
> 本文包含了所有SQL语言的基础语法，并用例子的方式向你展示。
## 基础
模式定义了数据如何存储、存储什么样的数据以及数据如何分解等信息，数据库和表都有模式。主键的值不允许修改，也不允许复用(不能使用已经删除的主键值赋给新数据行的主键)。SQL(Structured Query Language)，标准 SQL 由 ANSI 标准委员会管理，从而称为 ANSI SQL。各个 DBMS 都有自己的实现，如 PL/SQL、Transact-SQL 等。SQL 语句不区分大小写，但是数据库表名、列名和值是否区分依赖于具体的 DBMS 以及配置。SQL 支持以下三种注释:
### 注释
```sql
# 注释
SELECT *
FROM user; -- 注释
/* 注释1
   注释2 */
```
### 数据库创建与使用:
```sql
CREATE DATABASE test;
USE test;
```
## 创建表

```sql
CREATE TABLE mytable (
  id INT NOT NULL AUTO_INCREMENT,
  col1 INT NOT NULL DEFAULT 1,
  col2 VARCHAR(45) NULL,
  col3 DATE NULL,
  PRIMARY KEY (`id`));
```
## 修改表
### 添加列
```sql
ALTER TABLE mytable
ADD col CHAR(20);
```
### 修改列和属性
```sql
-- ALTER TABLE 表名 CHANGE 原字段名 新字段名 字段类型 约束条件
ALTER TABLE mytable 
CHANGE col col1 CHAR(32) NOT NULL DEFAULT '123';
```
### 删除列
```sql
ALTER TABLE mytable
DROP COLUMN col;
```
### 删除表
```sql
DROP TABLE mytable;
```
## 插入
### 普通插入
```sql
INSERT INTO mytable(col1, col2)
VALUES(val1, val2);
```
### 插入检索出来的数据
```sql
INSERT INTO mytable1(col1, col2)
SELECT col1, col2
FROM mytable2;
```
### 将一个表的内容插入到一个新表
```sql
CREATE TABLE newtable AS
SELECT * FROM mytable;
```
## 更新
```sql
UPDATE mytable
SET col = val
WHERE id = 1;
```
## 删除
```sql
DELETE FROM mytable
WHERE id = 1;
```
::: warning
使用更新和删除操作时一定要用 WHERE 子句，不然会把整张表的数据都破坏。可以先用 SELECT 语句进行测试，防止错误删除
:::
### TRUNCATE TABLE 可以清空表，也就是删除所有行。
```sql
TRUNCATE TABLE mytable;
```
::: danger
1. TRUNCATE TABLE 在功能上与不带 WHERE 子句的 DELETE 语句相同：二者均删除表中的全部行。但 TRUNCATE TABLE 比 DELETE 速度快，且使用的系统和事务日志资源少。
2. DELETE 语句每次删除一行，并在事务日志中为所删除的每行记录一项。TRUNCATE TABLE 通过释放存储表数据所用的数据页来删除数据，并且只在事务日志中记录页的释放。
3. TRUNCATE TABLE 删除表中的所有行，但表结构及其列、约束、索引等保持不变。新行标识所用的计数值重置为该列的种子。如果想保留标识计数值，请改用 DELETE。如果要删除表定义及其数据，请使用 DROP TABLE 语句。
4. 对于由 FOREIGN KEY 约束引用的表，不能使用 TRUNCATE TABLE，而应使用不带 WHERE 子句的 DELETE 语句。由于 TRUNCATE TABLE 不记录在日志中，所以它不能激活触发器。
5. TRUNCATE TABLE 不能用于参与了索引视图的表。
6. 对用TRUNCATE TABLE删除数据的表上增加数据时，要使用UPDATE STATISTICS来维护索引信息。
7. 如果有ROLLBACK语句，DELETE操作将被撤销，但TRUNCATE不会撤销。
:::

## 查询
### DISTINCT 去重
相同值只会出现一次。它作用于所有列，也就是说所有列的值都相同才算相同。
```sql
SELECT DISTINCT col1, col2
FROM mytable;
```
### LIMIT 限制返回的行数
限制返回的行数。可以有两个参数，第一个参数为起始行，从 0 开始；第二个参数为返回的总行数。
返回前 5 行:
```sql
SELECT *
FROM mytable
LIMIT 0, 5;
```
```sql
SELECT *
FROM mytable
LIMIT 5;
```
返回第 3 ~ 5 行:
```sqlSELECT *
FROM mytable
LIMIT 2 OFFSET 3;
```
```sql
SELECT *
FROM mytable
LIMIT 2, 3;
```
### ORDER BY 排序
规则
- ASC : 升序(默认)。
- DESC : 降序。

可以按多个列进行排序，并且为每个列指定不同的排序方式:
```sql
SELECT *
FROM mytable
ORDER BY col1 DESC, col2 ASC;
```
### WHERE 条件查询
不进行过滤的数据非常大，导致通过网络传输了多余的数据，从而浪费了网络带宽。因此尽量使用 SQL 语句来过滤不必要的数据，而不是传输所有的数据到客户端中然后由客户端进行过滤。
```sql
SELECT *
FROM mytable
WHERE col IS NULL;
```
### 通配符

通配符也是用在过滤语句中，但它只能用于文本字段。类型：
- % 匹配 >=0 个任意字符；_ 匹配 ==1 个任意字符；
- [ ] 可以匹配集合内的字符，例如 [ab] 将匹配字符 a 或者 b。用脱字符 
- ^ 可以对其进行否定，也就是不匹配集合内的字符。使用 Like 来进行通配符匹配。
```sql
SELECT *
FROM mytable
WHERE col LIKE '[^AB]%'; -- 不以 A 和 B 开头的任意文本
```
::: warning
不要滥用通配符，通配符位于开头处匹配会非常慢。
:::
### 计算字段
在数据库服务器上完成数据的转换和格式化的工作往往比客户端上快得多，并且转换和格式化后的数据量更少的话可以减少网络通信量。
计算字段通常需要使用 AS 来取别名，否则输出的时候字段名为计算表达式。
```sql
SELECT col1 * col2 AS alias
FROM mytable;q
```
CONCAT() 用于连接两个字段。许多数据库会使用空格把一个值填充为列宽，因此连接的结果会出现一些不必要的空格，使用 TRIM() 可以去除首尾空格。
```sql
SELECT CONCAT(TRIM(col1), '(', TRIM(col2), ')') AS concat_col
```
## 函数
各个 DBMS 的函数都是不相同的，因此不可移植，以下主要是 MySQL 的函数。
### 汇总

| 函数    | 说明             |
| ------- | ---------------- |
| AVG()   | 返回某列的平均值 |
| COUNT() | 返回某列的行数   |
| MAX()   | 返回某列的最大值 |
| MIN()   | 返回某列的最小值 |
| SUM()   | 返回某列值之和   |

AVG() 会忽略 NULL 行。

使用 DISTINCT 可以让汇总函数值汇总不同的值。

```sql
SELECT AVG(DISTINCT col1) AS avg_col
FROM mytable;
```

### 文本处理

| 函数      | 说明           |
| --------- | -------------- |
| LEFT()    | 左边的字符     |
| RIGHT()   | 右边的字符     |
| LOWER()   | 转换为小写字符 |
| UPPER()   | 转换为大写字符 |
| LTRIM()   | 去除左边的空格 |
| RTRIM()   | 去除右边的空格 |
| LENGTH()  | 长度           |
| SOUNDEX() | 转换为语音值   |

其中， **SOUNDEX()** 可以将一个字符串转换为描述其语音表示的字母数字模式。

```sql
SELECT *
FROM mytable
WHERE SOUNDEX(col1) = SOUNDEX('apple')
```

### 日期和时间处理

格式

- 日期格式: YYYY-MM-DD
- 时间格式: HH:MM:SS

| 函数          | 说明                           |
| ------------- | ------------------------------ |
| AddDate()     | 增加一个日期(天、周等)         |
| AddTime()     | 增加一个时间(时、分等)         |
| CurDate()     | 返回当前日期CurTime()          |
| Date()        | 返回日期时间的日期部分         |
| DateDiff()    | 计算两个日期之差               |
| Date_Add()    | 高度灵活的日期运算函数         |
| Date_Format() | 返回一个格式化的日期或时间串   |
| Day()         | 返回一个日期的天数部分         |
| DayOfWeek()   | 对于一个日期，返回对应的星期几 |
| Hour()        | 返回一个时间的小时部分         |
| Minute()      | 返回一个时间的分钟部分         |
| Month()       | 返回一个日期的月份部分         |
| Now()         | 返回当前日期和时间             |
| Second()      | 返回一个时间的秒部分           |
| Time()        | 返回一个日期时间的时间部分     |
| Year()        | 返回一个日期的年份部分         |

```bash
mysql> SELECT NOW();
2018-4-14 20:25:11
```

### 数值处理

| 函数   | 说明   |
| ------ | ------ |
| SIN()  | 正弦   |
| COS()  | 余弦   |
| TAN()  | 正切   |
| ABS()  | 绝对值 |
| SQRT() | 平方根 |
| MOD()  | 余数   |
| EXP()  | 指数   |
| PI()   | 圆周率 |
| RAND() | 随机数 |

## 分组

分组就是把具有相同的数据值的行放在同一组中。

可以对同一分组数据使用汇总函数进行处理，例如求分组数据的平均值等。

指定的分组字段除了能按该字段进行分组，也会自动按该字段进行排序。

```sql
SELECT col, COUNT(*) AS num
FROM mytable
GROUP BY col;
```

GROUP BY 自动按分组字段进行排序，ORDER BY 也可以按汇总字段来进行排序。

```sql
SELECT col, COUNT(*) AS num
FROM mytable
GROUP BY col
ORDER BY num;
```

WHERE 过滤行，HAVING 过滤分组，行过滤应当先于分组过滤。

```sql
SELECT col, COUNT(*) AS num
FROM mytable
WHERE col > 2
GROUP BY col
HAVING num >= 2;
```

分组规定:

- GROUP BY 子句出现在 WHERE 子句之后，ORDER BY 子句之前；
- 除了汇总字段外，SELECT 语句中的每一字段都必须在 GROUP BY 子句中给出；
- NULL 的行会单独分为一组；
- 大多数 SQL 实现不支持 GROUP BY 列具有可变长度的数据类型。

## 子查询

## 连接

### 内连接

### 自连接

### 自然连接

### 外连接

## 视图

## 存储过程

## 游标

## 触发器

## 事务管理

## 字符集

## 权限管理

## 组合查询







```sql
```

```sql
```

```sql
```
## 参考资料
- BenForta. SQL 必知必会 [M]. 人民邮电出版社, 2013.