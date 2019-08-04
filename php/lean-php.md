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

7. [ mysql]('./php-mysql/basic.md')

8. php 面向对象 OOP（Object-Oriented Programming）

> 软件危机：落后的软件生产方式无法满足迅速增长的软件需求，从而导致软件开发与维护过程中出现一系列严重问题的现象。 泛指在计算机软件的开发和维护的过程中所遇到的一系列严重问题

> 软件工程学：是一门研究用工程方法构建和维护有效的、实用的和高质量的软件学科。它涉及到程序语言设计、数据库、软件开发工具、系统平台、标准、设计模式等方面。
>分为结构化方法（按软件的周期分为三个阶段，分析、设计、编程）和面向对象。
> 面向对象编程（OOP）使其编程的代码更简洁、更易于维护，并且具有更强的可重用性。
> oop 达到了软件工程的三个目标： 重用性、灵活性、扩展性
> oop 面向对象编程的特点：封装、继承、多态

> 类，有成员属性和成员方法。类的格式如下

```
// 简单格式
【修饰符】 class 类名 { // 使用class 关键字加类名
    【成员属性】 // 也叫成员变量
    【成员方法】 // 也叫成员函数
}

// 完整格式
【修饰符】 class 类名 【extends 父类】 【implements 接口【，接口2 ...】】{
    【成员属性】 // 也叫成员变量
    【成员方法】 // 也叫成员函数
}

```

- 1.1 成员属性

格式： 修饰符 $变量名 【=默认值】; 如 ： ``` public $name = "qiphon"; ``` 

注意： 成员属性不可以是带运算符的表达式、变量、方法或函数调用

```
//  // 错误格式
public $var1 = 1+2; 

public $var2 = self::myStaticMethod();

public $var3 = $myVar;


// 正确写法

public $var1 = 100;

public $var2 = myConstant; // 常量

public $var3 = self::classConstant; // 静态属性

public $var4 = array(true,false);  

```

- 1.2 成员方法 

```
[修饰符] function 方法名（参数 ...）{
    [方法体]
    [return 返回值]
}

public function say(){
    echo "saying"; // 方法体
}

```

- 1.3 类的基本使用

```
$变量名 = new 要实例化的类名([参数,...])

$变量名 -> 成员属性 = 赋值；  // 对象的属性赋值

echo $变量名 -> 成员属性 ;   // 输出对象的成员属性

$变量名 ->  成员方法（【参数】）;  // 调用对象的方法

```

- 1.4 ```$this```

```php
// $this 与js 中的 this 差不多，都是对于当前类的指向

public function play(){
    echo 'playinng';
}
public function say(){
    return $this -> play();
}

```

- 2.1 构造方法和析构方法

```
// 构造方法格式
【修饰符】 function __construct([参数]){
    程序体
}

// 析构方法
【修饰符】 function __destruct([参数]){
    程序体
}


```

- 3.1 封装

> 封装性，是面向对象编程中的三大特性之一，封装就是把对象中的成员属性和成员方法上加上访问修饰符，使其尽可能隐藏对象内部细节，
以达到对成员的访问控制（不是拒绝访问）

```php
// 魔术方法 只能对protected 成员属性生效
// 魔术方法__set()   // 外面对成员赋值时调用
// 魔术方法__get()   // 取值的时候调用
// 魔术方法__isset()  // 判断的时候调用
// 魔术方法__unset()  // 释放属性的时候调用。

// 修饰符
public  (公有的，默认)

private  （私有的） // 私有成员 在对象的外部不能访问， 只能在对象的内部方法中使用$this 访问

<?php
class Persion{
    private $name;
    public function __construct($name)
    {
        $this->name = $name;
    }
    public function say()
    {
        return $this-> name;
    }
}

$qiphon = new Persion('qiphon');

echo $qiphon ->say();
// echo $qiphon -> name; //这里会报错

?>

protected  （受保护的）

<?php
class Persion{
    protected $name;
    public function __construct($name)
    {
        $this->name = $name;
    }
    public function say()
    {
        return $this-> name;
    }
}

$qiphon = new Persion('qiphon');

echo $qiphon ->say();
// echo $qiphon -> name; //这里会报错

?>

```

访问权限 |  private |  protected | public
--|--|--
同一类中|  可以  |   可以  |  可以
在类的外部 | 不可以  | 不可以  |  可以