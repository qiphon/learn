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