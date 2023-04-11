# 常用开发库 - Lombok工具库详解

> Lombok是一款非常实用Java工具，可用来帮助开发人员消除Java的冗长代码，尤其是对于简单的Java对象（POJO）。实际上我并不推荐使用Lombok（不主动使用它）, 但是因为它有着很大的使用量，我们仍然有必要掌握它，不仅知道如何使用和它解决的问题，还要知道它的坑。

## Lombok的引入
我们通常需要编写大量代码才能使类变得有用。如以下内容：

- `toString()`方法
- `hashCode()` and `equals()`方法
- `Getter` and `Setter`方法
- 构造函数

对于这种简单的类，这些方法通常是无聊的、重复的，而且是可以很容易地机械地生成的那种东西(ide通常提供这种功能)。

### 在引入Lombok之前我们是怎么做的
IDE中添加getter/setter, toString等代码

## Lombok的安装和使用

> 下面总结下如何使用。

### Lombok官网

[Lombok官网](https://projectlombok.org)

### Lombok安装
IDEA搜索Lombok插件

另外需要注意的是，在使用lombok注解的时候记得要导入lombok.jar包到工程，如果使用的是Maven的工程项目的话，要在其pom.xml中添加依赖如下

```sql
<!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
    <scope>provided</scope>
</dependency>
```
### Lombok注解说明
[Lombok官网](https://projectlombok.org/features/)

- `val`：用在局部变量前面，相当于将变量声明为final


## 参考文章
- https://projectlombok.org/
