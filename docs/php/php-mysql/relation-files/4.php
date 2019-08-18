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