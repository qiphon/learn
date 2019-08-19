<?php
    // session_start 函数一定要放置在页面的顶部
    session_start();
    // 存储 session 数据
    $_SESSION['views']=123555;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>session</title>
</head>
<body>
   <?php
        if (isset($_SESSION['views'])) {
            $_SESSION['views']=$_SESSION['views']+1;
        } else {
            $_SESSION['views']=1;
        }
        echo $_SESSION['views'];
        echo '<br>';
        // echo session_id();
        // phpinfo();
        // 销毁 Session
        // if (isset($_SESSION['views'])) {
        //     unset($_SESSION['views']);
        // }
        // 
        // 销毁 Session 第二种
        // session_destroy();
   ?>
</body>
</html>