# mySQL 基础 
> mySql (关系型数据库)

1. 创建表， 创建表的时候一定要给表设置编码格式（utf8_general_ci）,防止写入的内容出现乱码现象

2. PRIMARY 表的主索引

char（0-255） / varchar（0-65535） 作为表的字段的时候要设置字符的长度

3. 基本的sql 语句

```
// 查找所有
SELECT * FROM `news` WHERE 1
// where条件可以没有
SELECT * FROM `news` WHERE newsid=0

// 按条件查找
SELECT `newsid`, `title`, `img`, `content`, `addtime` FROM `news` WHERE 1

// 计算数量 count
 select count(*) from phplesson.phpcreatetable where lastname = 'Lee';
                      数据库名. 表名

// min() 求最小值
 select min(reg_date), phpcreatetable.* from phplesson.phpcreatetable;
                      查询表中所有的字段
// max() 求最小值
 select max(reg_date), phpcreatetable.* from phplesson.phpcreatetable;
                      查询表中所有的字段

// 其他方法 https://www.runoob.com/sql/sql-function.html
sum() 求和
sqrt()  求平方根
rand()  得到一个随机数
concat()  拼接字符串
select concat(id, ' ', firstname) from phpcreatetable;

now()  当前时间

// 稍复杂的查询
// 区间查询
select * from phpcreatetable where reg_date >= '2019-05-01' and reg_date <= '2019-08-05';
select * from phpcreatetable where reg_date  between '2019-05-01' and '2019-08-05';

sql 中的注释  -- 加空格 

// like 模糊查询， % 代表通配符，匹配任何字符
select * from phpcreatetable where firstname like 'q%';  // 找到以q开头的
select * from phpcreatetable where firstname like '%q%';  // 找到含有q的
select * from phpcreatetable where firstname like '%q';  // 找到以q结尾的

// 排序 order by ,
// desc 倒序，asc 正序
select * from phpcreatetable where firstname like '%i%' order by id desc;

// 2个表一起查
select * from phpcreatetable, t_study where phpcreatetable.id = t_study.id;
// 拿出指定字段
select phpcreatetable.id, phpcreatetable.firstname, t_study.gender from phpcreatetable, t_study where phpcreatetable.id = t_study.id;

//left/right join on 语句查出上面同样的字段(这个结果显示会不一样，这个会根据是left还是right，将左边表中的数据或右边表中的数据全部查一遍，最后输出左边表（right右边表）最后的匹配结果)
select phpcreatetable.id, phpcreatetable.firstname, t_study.gender from phpcreatetable LEFT JOIN t_study ON phpcreatetable.id = t_study.id;

select phpcreatetable.id, phpcreatetable.firstname, t_study.gender from phpcreatetable LEFT JOIN t_study ON phpcreatetable.id = t_study.id;

// 插入
INSERT INTO `news`(`newsid`, `title`, `img`, `content`, `addtime`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5])
// 主索引一般不给值
INSERT INTO `news`( `title`, `img`, `content`, `addtime`) VALUES ( '山东投毒案嫌疑人被释放 这不是冤案昭雪而是疑罪从无','http://5b0988e595225.cdn.sohucs.com/images/20190802/375e0632480e40d7b3fdd6df04c7bcf3.jpeg' ,'在这个前提之下，任艳红在看守所的8年时间，很难用“冤案”一词来简单概括，只能说是复杂现实的一个侧面——尽管这么说，会有人感到强烈不适，但这也不是偏','2019-8-3')

// 更新
UPDATE `news` SET `newsid`=[value-1],`title`=[value-2],`img`=[value-3],`content`=[value-4],`addtime`=[value-5] WHERE 1

UPDATE `news` SET `title`='修改',`content`='我是JFK洛杉矶的法律' WHERE newsid=1

// 删除
DELETE FROM `news` WHERE 1

DELETE FROM `news` WHERE newsid=1

```

### 本文件夹中的文件目录

```
|---\ 1. phpandmysql.md   php链接MySQL 
|
|
|---\ mysql        mysql常用命令
|
|
|
|
|
|
|
|
|
|---\ relation-files   相关的代码片段

```