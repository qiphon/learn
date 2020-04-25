# mysql 常用命令

1. MySQL workbench 图形化的MySQL管理工具

- 1.1. 下载地址https://dev.mysql.com/downloads/workbench/

- 1.2. 创建表的时候 要选择字符集 utf-8

2. MySQL常用命令

```sh
# 连接数据库 
mysql -uroot -p

# 查看所有的数据库 ,进入MySQL后，输入的每个命令都要以 分号 结尾
show databases;

#新建一个数据库
CREATE DATABASE 库名(不能已经存在) CHARSET=UTF8;
CREATE DATABASE books CHARSET=UTF8;

# 删除某个数据库
drop database [if exists] databaseName;

#查看数据库字符编码
show create database test1;

# 进入 指定数据库
use phplesson;

# 显示所有的表
show tables;

# 展示表的详细信息
SHOW CREATE TABLE `books`.`booklist`;

# 新建表 一定要用反引号
create table `booklist` ( 
    `id` int not null auto_increment, 
    `name` varchar(40) not null, 
    `update_time` varchar(13) not null,   
    `detail` char(255) , 
    primary key (`id`) 
);

# 给表中添加额外的字段
ALTER TABLE `booklist`
	ADD COLUMN `types` VARCHAR(50) NULL DEFAULT 'others' AFTER `detail`;

# 插入数据

INSERT INTO `t_books` VALUES (1, '穿书后我嫁给了男主他皇叔', '1586', '大河出版社', 15,'穿成书里一名既无脑又作死最后死于大反派手里的炮灰女配，叶萌萌傻眼了。怎么办？男主光芒四射，她躲着他！女主光环护身，她不敢惹！尼玛，最可恶是那个超级大反派，忒娘的既凶狠毒辣还作妖，亡她之心不死……这个怎么破？她躲不开也避不掉，干脆努力挖坑，我挖挖挖……巨坑挖好，她笑得一脸阴险，诱敌深入：“王爷，送你一套别墅，请入住！”某大反派瞅了一眼：“行，本王什么都不缺，就缺一个王妃，大小姐就做本王王妃一起入住别' );
INSERT INTO `booklist` VALUES ('', '他是冷酷总裁，坐拥庞大的商业帝国；她是落难千金，惨遭恶人迫害家破人亡。一纸交易，各取所需。“我会尽我所能，许你一世宠溺。 ', 'yanqing' );

# 查询表中的数据
SELECT * FROM `books`.`booklist` LIMIT 1000;

# 更新表中的数据（把 id 为 1 的数据 设置 types 为 a）
UPDATE `books`.`booklist` SET `types`='a' WHERE  `id`=1;

# 查看表的状态
MariaDB [books]> SHOW TABLE STATUS FROM `books`;
+----------+--------+---------+------------+------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
| Name     | Engine | Version | Row_format | Rows | Avg_row_length | Data_length | Max_data_length | Index_length | Data_free | Auto_increment | Create_time         | Update_time | Check_time | Collation          | Checksum | Create_options | Comment |
+----------+--------+---------+------------+------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
| booklist | InnoDB |      10 | Compact    |    2 |           8192 |       16384 |               0 |            0 |         0 |              3 | 2020-04-11 15:02:06 | NULL        | NULL       | utf8mb4_general_ci |     NULL |                |         |
+----------+--------+---------+------------+------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
1 row in set (0.00 sec)

# 删除表
drop table tableName;

#删除表中的所有数据，但是表结构依然存在
delete from tableName;

#显示表结构
describe tableName; (或者简写: desc tableName;)


# 查看服务器版本和当前日期
select version(),current_date;

select version();

select now();

# 把mysql作为一个简单的计算器
select pi();

select pi()*10;

# 退出MYSQL命令: exit (回车)

# 查询所有用户
SELECT User, Host, Password FROM mysql.user;

```