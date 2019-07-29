<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='referrer' content='always'>
    <meta name='author' content='qiphon'>
    <meta name='robots' content='none'>
    <meta name='keywords' content=''>
    <meta name='description' content=''>
    <meta name='renderer' content='webkit'>
    <meta name='revisit-after' content='7 days' >
    <meta http-equiv=widow-target Content=_top>
    <meta name='viewport' content='width=device-width, initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no, shrink-to-fit=no' viewport-fit=cover />
    <meta http-equiv='X-UA-Compatible' content='ie=edge,chrome=1'>
    <title>include 和 require</title>
    <style>
         *{
            margin:0;
            padding:0;
            box-sizing:border-box;
            -webkit-tap-highlight-color:transparent;
        }
    </style>
</head>
<body>
    <?php
        // 引用错误的文件 
        include_once('./11.php');
        require_once('./11.php');
        function show2() // 函数名不能相同
        {
            echo '我是2.php中的 show2';
        };

        // 如果是include 引用的文件，这里的echo 能输出，
        // 如果是require 引用的文件，这里的echo 不能显示
        show2();  

    ?>
</body></html>