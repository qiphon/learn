# php learn [（全称：PHP：Hypertext Preprocessor，即“PHP：超文本预处理器”）](https://zh.wikipedia.org/wiki/PHP)

> php 是面向对象的语言，学完PHP的面向对象能让我更好理解面向对象。
为了防止php输出的中文乱码，需要在php前面添加``` header("Content-Type: text/html;charset=utf-8");```

1. php 和 js 不同，所有的代码后面的分号必须要有，注释和js相同，流程语句的写法也与js相同

```
<?php
 /* 多行註解的第一行
 多行註解的另一行 */

 // 單行註解

 # 單行註解
 ?>

```

2. 变量命名

```
// 变量命名以 $ 开头
$abc = 'hello';
echo $abc;

 // 作用域
if($abc){
    $abc = 12;
}
echo $abc . 123;  // $abc 在这里获取不到，所以只能打印出 123

// isset() 用于判断变量是否被声明
echo '<br>'. (isset($abc) ? 'abc被声明了' : 'abc没有被声明');

// 作用域
if($abc){
    $abc = 12;  // 修改值
}
// 函数读取全局变量的方法
function show(){
    
    echo $abc;  // 这里不能输出任何值

    global $abc; // 必须使用global 关键字
    echo $abc;
    // 或者也可以这么写
    echo $GLOBALS['abc'];
}
show();


// 另一个有趣的例子
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

```

3. include 和 require

```
// 引用错误的文件 
// include_once('./11.php');
require_once('./11.php');
function show2() // 函数名不能相同
{
    echo '我是2.php中的 show2';
};

// 如果是include 引用的文件，这里的echo 能输出，
// 如果是require 引用的文件，这里的echo 不能显示
show2();  

```

4. array

```
<?php
    $arr = array(
        "runoob"=>array( // 指定下标数组
            "菜鸟教程",   // 默认下标数组
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

    echo json_encode($arr);  // arr =》 json
?>

```

5. session 

> 您在计算机上操作某个应用程序时，您打开它，做些更改，然后关闭它。这很像一次对话（Session）。计算机知道您是谁。它清楚您在何时打开和关闭应用程序。然而，在因特网上问题出现了：由于 HTTP 地址无法保持状态，Web 服务器并不知道您是谁以及您做了什么。

PHP session 解决了这个问题，它通过在服务器上存储用户信息以便随后使用（比如用户名称、购买商品等）。然而，会话信息是临时的，在用户离开网站后将被删除。如果您需要永久存储信息，可以把数据存储在数据库中。

Session 的工作机制是：为每个访客创建一个唯一的 id (UID)，并基于这个 UID 来存储变量。UID 存储在 cookie 中，或者通过 URL 进行传导。

```
// 第一个页面写入session
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


// 第二个页面读取session

<?php
    // 必须要有session_start
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

```

6. form 的 get / post 请求

```
// get / post 表单
 <h2>get</h2>
<form action="./6.1.php" method='get'>
    <input type="text" name="name" /><hr>
    <input type="password" name="pwd" /><hr>
    <button>提交</button>
</form>
<h2>post</h2>
<form action="./6.1.php" method='post' enctype="multipart/from-data">
    <input type="text" name="name" /><hr>
    <input type="password" name="pwd" /><hr>
    <button>提交</button>
</form>

// PHP 接受数据的方式

print_r($_GET);   // get 方式接收数据
print_r($_POST);  // post 方式接收数据
echo $_REQUEST['name'];  // get/post 方式传递的数据都能接收

```

7.[ mysql]('./php-mysql/basic.md')