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