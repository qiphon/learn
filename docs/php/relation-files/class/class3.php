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