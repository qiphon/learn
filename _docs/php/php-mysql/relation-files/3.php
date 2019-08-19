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
// 添加 单条数据 
// $sql = "INSERT INTO phpcreatetable (firstname, lastname, email)
// VALUES ('qiphon', 'Lee', 'qiphon3650@gmail.com')";

// $result = $conn-> query($sql);
// // echo ($result);die();
// if ($result ) {
//     echo "新记录插入成功";
// } else {
//     echo "Error: " . $sql . "<br>" . $conn->error;
// }
 
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

$conn->close();
?>