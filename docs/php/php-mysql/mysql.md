# mysql 常用命令

1. MySQL workbench 图形化的MySQL管理工具

- 1.1. 下载地址https://dev.mysql.com/downloads/workbench/

- 1.2. 创建表的时候 要选择字符集 utf-8

2. MySQL常用命令

```
// 连接数据库 
mysql -uroot -p

// 查看所有的数据库 ,进入MySQL后，输入的每个命令都要以 分号 结尾
show databases;

//新建一个数据库
CREATE DATABASE 库名(不能已经存在) CHARSET=UTF8;

// 删除某个数据库
drop database [if exists] databaseName;

//查看数据库字符编码
show create database test1;

// 进入 指定数据库
use phplesson;

// 显示所有的表
show tables;

// 新建表 一定要用反引号
create table `phplesson`.`t_study` (
    `id` int not null auto_increment ,
    `name` varchar(40) not null,
    `birth` date not null,
    `gender` char(1) not null,
    primary key (`id`) 
);

删除表
drop table tableName;

//删除表中的所有数据，但是表结构依然存在
delete from tableName;


//显示表结构
describe tableName; (或者简写: desc tableName;)


// 查看服务器版本和当前日期
select version(),current_date;

select version();

select now();

// 把mysql作为一个简单的计算器
select pi();

select pi()*10;

// 退出MYSQL命令: exit (回车)

// 查询所有用户
SELECT User, Host, Password FROM mysql.user;

```