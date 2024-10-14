use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Hello, 让我们玩一个猜字游戏吧！");

    let secret_number = rand::thread_rng().gen_range(1, 101);

    loop {
        println!(" ------------------ ");
        println!("请一个 1 - 100 之间的数字");

        // 空的 utf8 string  // :: 为静态属性
        let mut guess = String::new();

        io::stdin().read_line(&mut guess).expect("无法读取数据");

        // 用户输入错误后会直接退出
        // let guess: u32 = guess.trim().parse().expect("not a number!");
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => {
                println!("你猜的数字是 {}", num);
                num
            }
            Err(_) => {
                println!("您的输入 {} 不是一个数字", guess);
                continue;
            }
        };

        match guess.cmp(&secret_number) {
            Ordering::Equal => {
                println!("right !");
                break;
            }
            Ordering::Greater => println!("big !"),
            Ordering::Less => println!("low !"),
        }
    }
}
