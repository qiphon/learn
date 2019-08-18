<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>php </title>
</head>
<body>
    <?php
        // echo "test first <br />";
        // if语句
        // if(true){
        //     echo 'hello php';
        // }else {
        //     echo 'false';
        // };
        // 变量命名以 $ 开头
        $abc = 'hello';
        // echo $abc;

        // echo $abc . 123;  // $abc 在这里获取不到，所以只能打印出 123
        
        // isset() 用于判断变量是否被声明
        // echo '<br>'. (isset($abc) ? 'abc被声明了' : 'abc没有被声明');
        
        // 作用域
        if($abc){
            $abc = '我是 a.php';
        }
        // 函数读取全局变量的方法
        function show(){
            $abc = 'i am in show <br/>';
            echo $abc;  // 如果没有局部变量 $abc ,这里不能输出任何值

            global $abc; // 必须使用global 关键字
            echo $abc . '<br>';
            echo $GLOBALS['abc']; // 局部变量和全局变量虽然同名，但是可以显示2种结果
        }
        show();
    ?>
</body>
</html>