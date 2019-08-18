<?php
header("content-type: application/json; charset=utf-8;");

$sql = "select * from phpcreatetable;";

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
            $stmt = $conn->prepare($sql); 
            $stmt->execute();
            // 设置结果集为关联数组
            $is_suc = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
            $select_res = $stmt -> fetchAll();
            $arr = array();
            foreach($select_res as $k=>$v) { 
                // print_r($k);
                // print_r($v);
                array_push($arr, $v);
            }
            echo json_encode(array("errCode" => "ok", "result" => $arr));
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
