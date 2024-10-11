// rust array/vector

// 主函数，rust 文件必须有的
fn main() {
    // 长度固定的数组 (array)
    let four_ints: [i32; 4] = [1, 2, 3, 4];
    let four_ints2 = [1, 2, 3, 4];

    // 打印数组
    println!("{:?}", four_ints);
    // 打印并格式化
    println!("{:#?}", four_ints2);

    // 可变长度数组
    let mut vector: Vec<i32> = vec![1, 2, 5];

    vector.push(6);

    // 分片 - 某个数组(vector/array)的不可变视图
    // 和字符串分片基本一样，只不过是针对数组的
    let slice = &vector;

    // 和字符串一样，使用了指针之后就不能修改了
    // vector.push(8);
    // 指针的数据是不可修改的
    // slice.push(9);

    println!("{:?} -- {:?} -", vector, slice);

    let mut vector2 = vec![1, 2, 4];

    let slice2 = &mut vector2;
    slice2.push(9);
    println!("{:?} --  -", slice2);
    // 必须在 borrow 之后才能从新使用
    vector2.push(11);
    println!(" -- {:?} -", vector2,);
}
