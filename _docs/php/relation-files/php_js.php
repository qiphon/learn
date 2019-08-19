<?php
header("content-type: text/html; charset=utf-8;");
class Car {
    public function __construct($name)
    {
        echo '实例化的时候，我被执行';
        echo '<br>';
        $this->name = $name;
    }
    public function test()
    {
        echo '我没有被执行';
        echo '<br>';
    }
    public function __destruct()
    {   
        echo '__destruct 最后被执行';
        echo '<br>';
    }
}

$c = new Car('c');