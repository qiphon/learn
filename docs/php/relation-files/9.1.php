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
echo $qiphon::pie . ' qiphon::pie';
echo '<hr />';
echo Student::pie . ' student::pie';
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