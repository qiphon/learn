// rust number

// 主函数，rust 文件必须有的
fn main() {
    let x: i32 = 14;

    // 整形/浮点型数 后缀
    let y = 15i32;
    let _y2: i32 = 15i32;
    // 没有用到的变量会报错，如果一定要写，前面加下划线
    let _f: f64 = 1.22f64;

    // rust 会自动类型推导，可以忽略类型声明
    let _y = 11;

    // let 声明的变量是不可以修改的
    // error[E0384]: cannot assign twice to immutable variable `a`
    let a = 12;

    // 如果变量是可以修改的，需要使用 mut 修饰
    let mut b = 12;
    b += a;

    println!("{}", b);

    println!("{}", add(x, y));
}

fn add(x: i32, y: i32) -> i32 {
    // 隐式返回（不需要分号）
    x + y
}
