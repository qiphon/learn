<?php
    session_start();
    // echo session_id();
    // echo $_SESSION['views'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>array</title>
</head>
<body>
    <?php
        $arr = array(
            "runoob"=>array(
                "菜鸟教程",
                "http://www.runoob.com"
            ),
            "google"=>array(
                "Google 搜索",
                "http://www.google.com"
            ),
            "taobao"=>array(
                "淘宝",
                "http://www.taobao.com"
            )
        );

        // echo json_encode($arr);  // arr =》 json
        // 4.php 内容
        // session_start();
        echo '<br>'.( isset($_SESSION['views'])? '1': 2);
        echo '<br>';
        print_r($_SESSION) ;
        echo '<br>';
        echo $_SESSION['views'];
    ?>
</body>
</html>