// rust 入门

fn main() {
    // 必须以 ; 结尾
    println!("hello rust");
    /** 打印函数 */
    println!("{}", add(1, 2));
}

fn add(first: i32, sec: i32) -> i32 {
    return first + sec;
}
