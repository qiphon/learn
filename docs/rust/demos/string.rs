// rust string

// 主函数，rust 文件必须有的
fn main() {
    // 字符串必须使用双引号，单引号不可以
    // println!("{}", 'aaa');
    println!("{}", "aaa");

    let x: &str = "abc";

    // println!("{}, {}", x, "hello rust")

    // 一个 `String` – 在堆上分配空间的字符串
    let s: String = "hello rust".to_string();
    println!("{}", s);

    // 字符串分片(slice) - 另一个字符串的不可变视图
    // 基本上就是指向一个字符串的不可变指针，它不包含字符串里任何内容，只是一个指向某个东西的指针
    // 比如这里就是 `s`
    let s_slice: &str = &s;

    // 如果字符串有了其他变量的引用指针，这个变量就不能再修改了
    // s += "__add__";

    println!("{} {}", s, s_slice);

    // 字符串相加
    let strA = "12";

    // let concat = String::concat([strA, "---", "StrB"]);
    let concat = strA.to_owned() + &"strb";

    let concat2 = format!("{}{}", strA, "strB-format");

    let mut concat3 = String::from("hello, ");
    concat3.push_str(strA);

    println!("字符串相加 {},,,{}, from ,{}", concat, concat2, concat3);
}
