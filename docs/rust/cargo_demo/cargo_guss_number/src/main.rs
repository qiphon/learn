use std::io;

fn main() {
    println!("Hello, 让我们玩一个猜字游戏吧！");

    println!("请一个 1 - 100 之间的数字");

    let mut guess = String::new();

    io::stdin().read_line(&mut guess).expect("无法读取数据");

    println!("你猜的数字是 {}", guess);
}
