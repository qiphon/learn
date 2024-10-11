// rust function

// 主函数，rust 文件必须有的
fn main() {
    println!("{}", add(1, 2));
}

fn add(x: i32, y: i32) -> i32 {
    // 隐式返回（不需要分号）
    x + y
}
