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
|
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