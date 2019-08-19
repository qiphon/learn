<?php
header("content-type: application/json; charset=utf-8;");
// $firstname = $_GET['firstname'];
// $lastname = $_GET['lastname'];
// $email = $_GET['email'];
// post方式
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];

$sql = "insert into phpcreatetable ( firstname, lastname, email ) values('$firstname', '$lastname', '$email');";

mysqlConnect($sql);

function mysqlConnect($sql=''){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "phplesson";

    try{
        $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
        // 设置 PDO错误模式， 用于抛出异常
        $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if($sql){
            $conn ->exec("set names utf8");
            $res = $conn -> exec($sql);
            echo json_encode(array("errCode" => "ok"));
        }
        else{
            echo json_encode(array("errCode" => 'fail'));
        }
    }
    catch(PDOException $e){
        echo $sql . "<br />" . $e -> getMessage();
    }

    // print_r($conn);
    $conn = null;
}

?>