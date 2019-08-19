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