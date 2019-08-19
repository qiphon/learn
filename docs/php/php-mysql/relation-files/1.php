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