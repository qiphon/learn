<?php
    header( 'Content-Type:application/json;charset=utf-8 ');
    // print_r($_GET);
    // print_r($_POST);
    // echo '<br>';
    // echo $_REQUEST['name'];
    $name = $_GET['name'];
    $pwd = $_GET['pwd'];
    if($name == 'qiphon' && $pwd == "123"){
        echo json_encode(array('msg'=>'success', 'errCode'=> 0));
    }else {
        echo json_encode(array('msg'=>'failed', 'errCode'=> 1));
    }
    
?>