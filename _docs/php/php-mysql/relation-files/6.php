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