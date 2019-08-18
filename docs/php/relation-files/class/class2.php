<?php

/**
 *  测试构造方法和析构方法
 * 
 */
class Persion {
    public function __construct($age)
    {   
        // 实例化（new）的时候自动执行这里
        echo 'hello ' . $age;
        echo '<br>';
        $this->age = $age;
    }
    public function __destruct()
    {
        // 用途 可以执行资源的释放操作 例如数据库关闭
        // 对象被销毁的时候执行
        echo 'class destroyed' . $this->age;
        echo '<hr />';
    }
    public function data()
    {
        return $this ->age;
    }
}

$qiphon = new Persion(25);
$qiphon2 = new Persion(30);

echo $qiphon -> data() . '<br>';
echo $qiphon2 -> data() . '<br>';

?>