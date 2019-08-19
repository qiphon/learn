<?php
header("Content-Type: text/html;charset=utf-8");
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