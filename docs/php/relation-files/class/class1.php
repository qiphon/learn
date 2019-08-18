<?php
    header("content-type: text/html; charset=utf-8");
    /**
     *   声明一个类
     * 
     */
    class Persion {
        public $age ;
        public function say($word=''){
            echo $word ? $word : 'say nothing';
            // echo $word || 123; // php 没有这2种写法
            // echo ($word && 124);
        }
        public function info($word='')
        {
            $this -> say($word);
            return $this -> age;
        }
    }

    $qiphon = new Persion();

    $qiphon ->age = 27;

    $res = $qiphon->info('just say hello php');
    echo '<br>';
    echo $res;
    // echo $qiphon->age;  // 这个

?>