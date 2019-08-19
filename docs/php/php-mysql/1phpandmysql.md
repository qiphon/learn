# PHP 链接 MySQL 及相关操作

1.1 连接数据库

```php
<?php
header("Content-Type: text/html;charset=utf-8");
$servername = "localhost";
$username = "root";
$password = "";
 
// // 创建连接 面向过程方式
// $conn = mysqli_connect($servername, $username, $password);
 
// // 检测连接
// if (!$conn) {
//     die("Connection failed: " . mysqli_connect_error());
// }
// echo "连接成功111";
// mysqli_close($conn);

// // 创建连接，面向对象方式
// $conn = new mysqli($servername, $username, $password);
 
// // 检测连接
// if ($conn->connect_error) {
//     die("连接失败: " . $conn->connect_error);
// } 
// echo "连接成功";
// $conn->close()

// 创建链接 pdo
try {
    $conn = new PDO("mysql:host=$servername;", $username, $password);
    echo "连接成功"; 
    $conn = null;
}
catch(PDOException $e)
{
    echo $e->getMessage();
}

?>

```

1.2 创建表

[SQL 用于各种数据库的数据类型](https://www.runoob.com/sql/sql-datatypes.html)

> 常用的值分析
在设置了数据类型后，你可以为每个列指定其他选项的属性：
NOT NULL - 每一行都必须含有值（不能为空），null 值是不允许的。
DEFAULT value - 设置默认值
UNSIGNED - 使用无符号数值类型，0 及正数
AUTO INCREMENT - 设置 MySQL 字段的值在新增记录时每次自动增长 1
PRIMARY KEY - 设置数据表中每条记录的唯一标识。 通常列的 PRIMARY KEY 设置为 ID 数值，与 AUTO_INCREMENT 一起使用。
每个表都应该有一个主键(本列为 "id" 列)，主键必须包含唯一的值 

```php
<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "phplesson";
 
// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 
// 使用 sql 创建数据表
$sql = "CREATE TABLE phpcreateTable (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP
)";
 
if ($conn->query($sql) === TRUE) {
    echo "Table phpcreateTable created successfully";
} else {
    echo "创建数据表错误: " . $conn->error;
}
 
$conn->close();
?>

```

3. 向数据表插入数据

> 以下为一些语法规则：
PHP 中 SQL 查询语句必须使用引号
在 SQL 查询语句中的字符串值必须加引号
数值的值不需要引号
NULL 值不需要引号

```php

<?php
header("content-type: text/html; charset= utf-8;");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "phplesson";
 
// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 
$sql = "INSERT INTO phpcreatetable (firstname, lastname, email)
VALUES ('qiphon', 'Lee', 'qiphon3650@gmail.com')";

$result = $conn-> query($sql);
// echo ($result);die();
if ($result ) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
 
$conn->close();
?>

// 添加多条数据 ，每条语句之间要用分号隔开

$sql = "INSERT INTO phpcreatetable (firstname, lastname, email)
VALUES ('John', 'Doe', 'john@example.com');";
$sql .= "INSERT INTO phpcreatetable (firstname, lastname, email)
VALUES ('Mary', 'Moe', 'mary@example.com');";
$sql .= "INSERT INTO phpcreatetable (firstname, lastname, email)
VALUES ('Julie', 'Dooley', 'julie@example.com')";

$result = $conn -> multi_query($sql);

if($result){
    echo '插入成功';
}
else {
    echo "Error: " . $sql . '<br />' . $conn-> error;
}


```

4. 查询语句 select

``` php
<?php
header('content-type: application/json; charset=utf-8;');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "phplesson";
 
// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
// 按字段查询
// $sql = "SELECT id, firstname, lastname, reg_date FROM phpcreatetable";
// 查询所有
// $sql = "select * from phpcreatetable;";
// where 语句
// $sql = "select * from phpcreatetable where id = 5;";
// order by   ( [desc | asc] 排序方式，默认asc)
$sql = "select * from phpcreatetable order by id asc;";

$result = $conn->query($sql);
 
if ($result->num_rows > 0) {
    // 输出数据
    // print_r($result);
    $arr = array();
    while($row = $result->fetch_assoc()) {
    //     echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
        array_push($arr, array( 
            "id" => $row['id'], 
            'name' => $row['firstname']. $row['lastname'],
            'email' => $row['email'],
            'time' => $row['reg_date'] 
        ));
    }
    echo json_encode($arr);
} else {
    echo "0 条结果";
}
$conn->close();
?>

```


5. 更新语句 update

```php
<?php
header('content-type: application/json; charset=utf-8;');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "phplesson";

 
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // 设置 PDO 错误模式，用于抛出异常
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "update phpcreatetable set email = '13@ad.com' where id = 3; ";
    $sql .= "update phpcreatetable set email = '14@ad.com' where id = 4; ";
    $sql .= "update phpcreatetable set email = '15@ad.com' where id = 5; ";
    // // 使用 exec() ，没有结果返回 
    $res = $conn->exec($sql);
    // print_r($res);
    echo "成功" . $res;
}
catch(PDOException $e)
{
    echo $sql . "<br>" . $e->getMessage();
}
$conn = null;



// // 创建连接  
// $conn = new mysqli($servername, $username, $password, $dbname);
// // Check connection
// if ($conn->connect_error) {
//     die("连接失败: " . $conn->connect_error);
// } 

// $sql = "update phpcreatetable set email = '3@ad.com' where id = 3; ";
// $sql .= "update phpcreatetable set email = '1234@ad.com' where id = 4; ";

// // $result = $conn->query($sql);
// $result = $conn -> multi_query($sql);
 
// if ($result) { 
//     echo '更新成功';
// } else {
//     echo "0 条结果";
// }
// $conn->close();
?>

```


6. 删除语句 delete

```php
<?php
header('content-type: application/json; charset=utf-8;');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "phplesson";

 
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // 设置 PDO 错误模式，用于抛出异常
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "delete from phpcreatetable where id = 3; ";
    // // 使用 exec() ，没有结果返回 
    $res = $conn->exec($sql);
    // print_r($res);
    echo "成功" . $res;
}
catch(PDOException $e)
{
    echo $sql . "<br>" . $e->getMessage();
}
$conn = null;


?>

```

> 向MySQL中插入数据的时候 ，一定要设置编码格式 如：``` $conn ->exec("set names utf8"); ``` ， 不然存入mysql的数据会乱码