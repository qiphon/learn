# php learn [（全称：PHP：Hypertext Preprocessor，即“PHP：超文本预处理器”）](https://zh.wikipedia.org/wiki/PHP)

> php 是面向对象的语言，学完PHP的面向对象能让我更好理解面向对象。
为了防止php输出的中文乱码，需要在php前面添加``` header("Content-Type: text/html;charset=utf-8");```

1. php 和 js 不同，所有的代码后面的分号必须要有，注释和js相同，流程语句的写法也与js相同

```php
<?php
 /* 多行註解的第一行
 多行註解的另一行 */

 // 單行註解

 # 單行註解
 ?>

```

2. 变量命名

```php
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
// 作用域 php 是块级作用域
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

```php
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

```php
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

```php
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

```php
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

7. [ mysql](./php-mysql/basic.md)

8. php 面向对象 OOP（Object-Oriented Programming）

> 软件危机：落后的软件生产方式无法满足迅速增长的软件需求，从而导致软件开发与维护过程中出现一系列严重问题的现象。 泛指在计算机软件的开发和维护的过程中所遇到的一系列严重问题

> 软件工程学：是一门研究用工程方法构建和维护有效的、实用的和高质量的软件学科。它涉及到程序语言设计、数据库、软件开发工具、系统平台、标准、设计模式等方面。
>分为结构化方法（按软件的周期分为三个阶段，分析、设计、编程）和面向对象。
> 面向对象编程（OOP）使其编程的代码更简洁、更易于维护，并且具有更强的可重用性。
> oop 达到了软件工程的三个目标： 重用性、灵活性、扩展性
> oop 面向对象编程的特点：封装、继承、多态

> 类，有成员属性和成员方法。类的格式如下

```php
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

- 8.1.1 成员属性

格式： 修饰符 $变量名 【=默认值】; 如 ： ``` public $name = "qiphon"; ``` 

注意： 成员属性不可以是带运算符的表达式、变量、方法或函数调用

```php
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

- 8.1.2 成员方法 

```php
[修饰符] function 方法名（参数 ...）{
    [方法体]
    [return 返回值]
}

public function say(){
    echo "saying"; // 方法体
}

```

- 8.1.3 类的基本使用

```php
$变量名 = new 要实例化的类名([参数,...])

$变量名 -> 成员属性 = 赋值；  // 对象的属性赋值

echo $变量名 -> 成员属性 ;   // 输出对象的成员属性

$变量名 ->  成员方法（【参数】）;  // 调用对象的方法

```

- 8.1.4 ```$this```

```php
// $this 与js 中的 this 差不多，都是对于当前类的指向

public function play(){
    echo 'playinng';
}
public function say(){
    return $this -> play();
}

```

- 8.2.1 构造方法和析构方法

```php
// 构造方法格式
【修饰符】 function __construct([参数]){
    程序体
}

// 析构方法
【修饰符】 function __destruct([参数]){
    程序体
}


```

- 8.3.1 封装

> 封装性，是面向对象编程中的三大特性之一，封装就是把对象中的成员属性和成员方法上加上访问修饰符，使其尽可能隐藏对象内部细节，
以达到对成员的访问控制（不是拒绝访问）

```php
// 魔术方法 只能对protected/private 成员属性生效，
// 魔术方法 必须是public
// 魔术方法__set()   // 外面对成员赋值时调用
// 魔术方法__get()   // 取值的时候调用
// 魔术方法__isset()  // 判断的时候调用
// 魔术方法__unset()  // 释放属性的时候调用。

<?php
header('content-type: text/html; charset=utf-8');
class Persion{
    private $name;
    protected $age;
    public function __construct($name='noName', $age='0')
    {
        $this->name = $name;
        $this->age = $age;
    }
    public function say()
    {
        return 'name->' . $this-> name . '  ---age->' . $this->age;
    }
    // 魔术方法
    public function __set($key, $val)
    {
        $this-> $key = $val;
    }
    public function __get($key)
    {
        // if($key == 'name' || $key == 'age'){
        //     return $this->$key;
        // }
        if(isset($this->$key)){
            return $this->key;
        }
        else{
            return '没有这个值哦';
        }
    }
    public function __isset($key)
    {
        return $this-> $key;
    }
    public function __unset($key)
    {
        // echo $key;
        unset($this->age);
    }
}

$qiphon = new Persion('qiphon', 20);

// var_dump(isset($qiphon->age)); // bool(false) , 如果有魔术方法这里就不会报错 bool(true)
unset($qiphon->age);  // 这里会报错，如果有魔术方法这里就不会报错
// echo $qiphon-> age;  // Notice: Undefined property: Persion::$age // unset之后会报错

// 如果被unset掉这个，之后取每个属性的值的时候都会报错
// $qiphon ->age = 25;   // 这里会报错，如果有魔术方法这里就不会报错
// echo $qiphon ->say();
echo '<br>';
echo $qiphon -> name; //这里会报错,如果有魔术方法这里就不会报错
echo '<br>';
// echo $qiphon -> age; //这里会报错,如果有魔术方法这里就不会报错

?>

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
--|--|--|--
同一类中|  可以  |   可以  |  可以
在子类中 | 不可以 | 可以   | 可以
在类的外部 | 不可以  | 不可以  |  可以


- 8.4.1 继承和多态

> 对象的多态性 : 是指在父类中定义的属性或行为被子类继承后可以具有不同的数据类型或表现出不同的行为.这使得同一个属性或行为在父类及其各子类中具有不同的语义.

> 在子类里面允许重写（覆盖）父类中的方法
在子类中，使用parent 访问父类中被覆盖的属性和方法
parent::construct()
parent::fun()

```php


<?php
header("content-type: text/html; charset=utf-8;");
class Persion {
    public $name;
    private $money;
    protected $age;
    public function __construct($name,$money, $age)
    {       
        $this->name = $name;
        $this->money = $money;
        $this->age = $age;
    }
    public function info($ab='')
    {
        echo $this->name . ' say i\'m ' . $this->age . ' and money only ' . $this->money ;
        echo '<hr>'. $ab;
    }
}

$M = new Persion('qiphon', 10, 25);
// echo $M ->name; // qiphon
// 下面2个都不能输出
// echo $M ->money;
// echo $M ->age;

// $M->info();   // qiphon say i'm 25 and money only 10

// 这样就实现了继承
class Male extends Persion {

}

$male = new Male('male', 11, 26);

// $male->info(); // male say i'm 26 and money only 11

// echo $male->name;  // male  同样的，这里也能获取到

// Notice: Undefined property: Male::$money in D:\xampp\htdocs\8.4.php on line 38
// 这个报错证明 male 没有 money 这个属性 ，证明父级的private 属性子级无法拿到
// echo $male->money;  
// Fatal error: Cannot access protected property Male::$age in D:\xampp\htdocs\8.4.php on line 39
// 这个报错证明 male 有 age 这个属性
// echo $male->age;  


// 再写一个类
class Female extends Persion {
    // 当在这里再次写__construct 函数的时候相当于重写父级的方法，
    // 如果这里什么都不写，我们可以看到下面连name都打印不出来
    public function __construct($name,$money, $age)
    {
        
    }

}

$female = new Female('zoe', 30, 22);

// echo $female->name;
// echo $female->age;
// echo $female->money;


// 重复上一个类
class Female2 extends Persion {
    // Fatal error: Access level to Female2::$age must be protected (as in class Persion) or weaker 
    // 属性的类型必须和父级一样，不然会报错 , 所以我们定义相同的属性是没有意义的
    // private $age;   
    // public $name;
    // private $money;
    // protected $age;   
    // 重写父级的方法
    public $desc;
    public function __construct($name,$money, $age, $desc)
    {
        // 继承父级的方法  参数还要再注入进去
        parent::__construct($name,$money, $age);
        $this->desc = $desc;
    }
    // 方法也是一样的写法 重写这个方法
    public function info($ab, $more='')
    {
        // 如果有参数一定要传进去
        parent::info($ab);
        echo  '<hr>'. $more;
    }
    public function __destruct()
    {
        // Notice: Undefined property: Female2::$money
        // 取不到money 会报错
        // echo '<hr>'. '我能取到age，但是取不到money'. $this->age . ' money-> ' . $this-> money;
    }
    public function __get($key){
        return $this->$key;
    }
}

$female2 = new Female2('zoe', 30, 22, 'nothing');

// echo $female2->name;  // zoe
// 下面的还是一样的效果
// echo $female2->money;
echo $female2->age;   // 有get 方法就能取的到

// 重新定义的属性可以输出
// echo '<hr>'. $female2->desc;   // nothing

// $female2->info('ccccc','bbbb');

?>



```


9. 抽象方法和抽象类

- 9.1. 抽象类
> 当类中有一个方法,他没有方法体(就是没有花括号),直接分号结束,这种方法我们叫抽象方法, 必须使用关键字 abstract 定义
如 ``` public abstract function fun(); ```
> 包含这种方法的类必须是抽象类,也要使用关键字 abstract 加以声明.(即使用关键字 abstract 修饰的类为抽象类)

抽象类的特点:

- 不能实例化,也就是不能new 成对象
- 若想使用抽象类,就必须定义一个类去继承这个抽象类,并定义覆盖父类的抽象方法(实现抽象方法).


- 9.2 接口 

> PHP与大多数面向对象编程语言一样,不支持多重继承,也就是说每个类只能继承一个父类.
为解决这个问题,PHP引入了接口,接口的思想是指定了,一个实现了该接口的类必须实现一系列函数

```php
// 定义格式 

interface 接口名 {
    // 常量成员  (使用const 关键字定义)
    // 抽象方法  (不需要使用abstract 关键字)
}

使用格式: class 类名 implements 接口1,接口2... {...}


```

- 9.3 抽象类 和 接口的区别

> 在高级语言上,一个类一个类只能继承一个类(抽象类),正如人不可能同时是生物和非生物,但是可以实现多个接口(吃饭/走路等).

|接口| 抽象类|
--|--|--
当你关注事物本质的时候,用抽象类; | 当你关注一个操作的时候,使用接口
接口是对动作的抽象,表示这个对象能做什么,对类的局部行为进行抽象. | 抽象类是对根源的抽象,表示这个类是什么,对类的整体进行抽象,对一类事物的抽象描述
人可以吃东西,狗也可以吃东西,我们就可以把"吃东西"定义成一个接口| 男人和女人可以是2个类,他们的抽象类是人
接口是抽象类的变体,接口中所有的方法都是抽象的.| 抽象类是声明方法的存在而不去实现他的类
接口可以多继承| 抽象类只能继承一个
接口定义方法,不能实现 | 抽象类可以实现部分方法
接口中基本的数据类型为static | 抽象类不是这样的
接口中不能含有静态代码块以及静态方法| 抽象类可以含有静态方法和静态代码块

```php
// 抽象类
<?php

header("content-type: text/html; charset=utf-8");
/**
 *  1. 含抽象方法的类,必须是抽象类
 *  2. 抽象类不一定非要含有抽象方法
 *  3. 抽象类可以存在普通的方法
 *  4. 抽象类不能被实例化,必须由一个子类去继承,并且把抽象类的抽象方法都实现了
 */
abstract class Man {
    public function eat()
    {
        echo 'eat';
    }
    // 抽象方法可以没有方法体
    public abstract function say();
}

// $qiphon = new Man();  // Fatal error: Cannot instantiate abstract class Man

class Male extends Man {
    public function say($say='')
    {
        echo $say ?: 'say nothing';
    }
}

$qiphon = new Male();
$qiphon ->say();
echo '<br>';
$qiphon -> eat();

?>

// 接口

<?php
header("content-type: text/html; charset=utf-8;");
/**
 *   interface
 *   1. 接口的关键字是interface
 *   2. 接口可以声明常量,也可以抽象方法
 *   3. 接口中的方法都是抽象方法,不需要abstract 去定义
 *   4. 接口不能被实例化,需要一个类去实现它
 *   5. 一个类可以有多个接口
 */
interface Man {
  const fromInter = "man interface";
  public function run();
  public function eat();
}

interface Study {
  public function study();
}

class Student implements Man, Study {
    private $name ;
    const pie = 3.14;
    public function __construct($name)
    {
        $this->name = $name;
    }
    public function eat($eat='eat nothing')
    {
        echo $this->name . ' is eating' . $eat;
    }
    public function run($run = 'in grass')
    {
        echo $this->name . 'running in ' . $run;
    }
    public function study($book='nothing')
    {
        echo $this->name . ' is reading ' . $book;
    }
    static function test()
    {
        return self::fromInter;
    }
    public function selfConst()
    {
        return self::pie;
    }
}

$qiphon = new Student('qiphon');

// $qiphon -> eat("🍎");
// $qiphon -> study('php');

// interface 中的常量
echo $qiphon::fromInter . ' qiphon::fromInter';
echo '<hr />';
// 从类上找
echo Student::fromInter . ' student::fromInter';
echo '<hr />';
echo $qiphon-> test() . ' qiphon->test()';
echo '<hr />';
echo Student::test() . ' student::test()';
echo '<hr />';
echo Student::selfConst() . ' student::selfConst()';
echo '<hr />';
echo $qiphon-> selfConst() . 'qiphon-> selfConst()';

```

10. 常见关键字


- final

> php5中新增关键字,它只能用来修饰类和方法.不能修饰成员属性
- 1. 使用final关键字标识的类不能被继承
- 2. 使用final关键字标识的方法不能被子类覆盖(重写),是最终版本

目的 : 1. 为了安全; 2. 没有必要被继承或重写

- static

> static 表示静态的意思,用于修饰类的成员属性和成员方法(即静态属性和静态方法)
静态方法中不可以使用非静态的内容.就是不让使用this
静态属性是共享的,也就是new 很多对象也是公用一个属性;

```php
// 类中的静态属性和方法不用实例化(new ) 就可以使用类名访问
类::静态属性
类::静态方法

在类的方法中,不能用this来引用静态变量或静态方法,需要使用self

public function test(){
    return self::静态属性;
    return self::静态方法;
}

```

- 单例设计模式

> 单例模式的主要作用是保证在面向对象编程设计中,一个类只能有一个实例对象存在

- const 关键字

> const 是一个在类中定义常量的关键字,我们都知道在php中定义常量使用的是 "define()" 这个函数,但是在类里面定义常量使用的是"const" 

```php
const con = 'const value';  // 定义

echo self::con;   // 类内部访问

echo className::con; // 类外面访问

```

- instanceof

> 用于检测当前对象示例是否属于某一个类或这个类的子类


11. 异常处理

- 11.1 系统自带的异常处理

```php
class Exception {
    protected $message = 'Unknown exception';  // 异常信息
    protected $code = 0;      // 用户自定义异常代码
    protected $file;         // 发生异常的文件名
    protected $line; 
    function __construct($message = null, $code=0);
    final function getMessage();        // 返回异常信息
    final function getCode();           // 返回异常代码
    final function getFile();           // 返回发生异常的文件名
    final function getLine();           // 返回发生异常代码的行号
    final function getTrace();          // backtrace() 数组
    final function getTraceAsString();  // 字符串化 getTrace()信息
    function __toString();              // 可输出的字符串
}

```

- 11.2 字定义异常处理

- 11.3 捕捉多个异常处理