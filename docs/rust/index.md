# [rust](https://www.rust-lang.org/learn)

Rust 是由 Mozilla 研究院开发的编程语言。Rust 将底层的性能控制与高级语言的便利性和安全保障结合在了一起。

而 Rust 并不需要一个垃圾回收器或者运行时即可实现这个目的，这使得 Rust 库可以成为一种 C 语言的替代品。

#### 擅长领域

- 高性能 web service
- webassembly
- 命令行工具
- 网络编程
- 嵌入式设备
- 系统编程

#### 优点

- 性能好
- 安全
- 高并发

特别注意：rust 有很多独有的概念，他们和现在的大多数主流语言都不同。

#### 安装与卸载

直接官网下载可执行程序。

- 是否安装检查： `rustc -V` eg. (rustc 1.81.0 (eeb90cda1 2024-09-04))
- rust 本地文档: `rustc doc`
- 更新： `rustup update <stable (版本)>`
- 卸载：`rustup self uninstall`

开发者工具，推荐使用 vscode，安装插件 rust-analyzer

编译 rust 文件，`rustc hello.rs` 之后会生成一个可执行文件。

## cargo

rustc 只能编译一些简单的程序，如果是复杂的程序就需要使用 cargo

cargo 是 rust 的构建系统和包管理工具

检测 cargo 是否安装 `cargo --version` (cargo 1.81.0 (2dbb1af80 2024-08-20))

使用 cargo 创建一个项目： `cargo new hello_project`

- src 主要代码目录
- cargo.toml cargo 项目信息

  - 【package】表示下面的内容都是配置信息

  ```rust
  [package]
  authors = ["qiphon <qiphon@aaa.com>"]
  description = "A Tauri App"
  edition = "2021"
  name = "tauri-app-react"
  version = "0.1.0"
  ```

  - dependencies 依赖的第三方库

  ```rust

  [dependencies]
  serde = {version = "1", features = ["derive"] }
  serde_json = "1"
  tauri = {version = "2.0.0", features = [] }
  ```

rust 里面，代码包称作 crate

### cargo 命令

- `cargo build` 生成的文件在 `target/debug/`
- `cargo run` 构建并执行
- `cargo check` 检查代码，确保能通过编译，但是不生成可执行文件。它比 cargo build 速度快很多，编写代码时通常周期性调用 cargo check 来保证代码正确。
- 发布构建 `cargo build --release`
  - 会进行优化，代码运行会更快，但是执行时间会更长
  - 生成的文件在 `target/release`

## language

### 声明变量

- let 声明的变量默认是 immutable，如果是要声明一个可变的变量，可以使用 mut `let mut a = "hello rust";`
- const 常量

  - 类型必须被标注
  - 可以在任何作用域内声明。
  - 常量的值可以是常量表达式，无法使用 **函数的调用结果或者是运行时计算的值**
  - 命名规范：全字母大写，下划线分割 `MAX_INTERVAL`, eg. `const MAX_INTERVAL:u32 = 100_000`

- shadow 隐藏

  - 可以使用同名的变量，新的变量就会 shadow 之前声明的变量。

  ```rust
  fn main() {
      // 必须以 ; 结尾
      println!("hello rust shadow");
      let x = 123;

      let x = 123 + 1;
      // ** 打印函数
      println!("{}", x);
  }

  ```

  - shadow 和 `let mut` 的区别
    - 如果不使用 mut 关键字，let 声明的变量就不能重新赋值
    - 使用 let 声明的同名变量也是不可变的
    - 使用 let 声明的同名变量类型可以和之前不同

### 数据类型

标量类型和复合类型。

rust 是静态编译语言，在编译时必须知道所有变量的类型

- 基于使用的值，编译器通常能够推断出它的具体类型
- 但如果可能的类型比较多（例如 string 的 parse 方法），就必须添加类型标注，否则编译器会报错。

所有类型一览

- array
- bool
- char
- f128
- f16
- f32
- f64
- fn
- i128
- i16
- i32
- i64
- i8
- isize
- never
- pointer
- reference
- slice
- str
- tuple
- u128
- u16
- u32
- u64
- u8
- unit
- usize

### 标量类型

整数类型、浮点类型、布尔类型、字符类型

- 整数类型

  - 没有小数部分
  - 无符号整数类型以 u 开头
  - 有符号整数类型以 i 开头
  - 整数类型如下

  ```
  length         signed（有符号） unsigned（无符号）

  8-bit          i8             u8
  16-bit         i16            u16
  32-bit         i32            u32
  64-bit         i64            u64
  128-bit        i128           u128
  arch           isize          usize
  ```

  - isize 和 usize 类型的位数是由程序运行的计算机的架构决定的
    - 如果是 64 位计算机那就是 64 位
    - 使用 isize 或 usize 的主要场景是对于某种集合进行索引操作

整数的字面值

| number literals | example     |
| --------------- | ----------- |
| Decimal 十进制  | 98_222      |
| Hex 十六进制    | 0xff        |
| Octal 八进制    | 0o77        |
| Binary 二进制   | 0b1111_0000 |
| Byte (u8 only)  | b'A'        |

除了 byte 类型外，所有的数值字面值都允许使用类型后缀。 eg. `57u8`

如果不太确定应该使用哪种类型，可以使用 rust 的默认类型

整数的默认类型是 ℹ32 ，总体上来说速度很快。

- 整数溢出：例如在 u8 的范围是 0-255，如果你把一个 u8 变量的值设置为 256，那么：

  - 调试模式下：程序会发生 panic （错误提示）
  - release 模式下：rust 不会检查是否溢出，
    - 如果发生溢出，rust 会执行**“环绕“**操作。（256 编程 0,257 变成 1）
    - 程序不会 panic

#### 浮点类型

rust 有 2 种基础的浮点类型，浮点类型使用 IEEE-754 标准来描述

- f32， 32 位，单精度
  - 单精度：占用4个字节（32位）的存储空间。这包括1位符号位、8位阶码（指数位）和23位尾数（有效数字位）
  - 数值范围约为-3.4E38至3.4E38（即-3.4乘以10的38次方至3.4乘以10的38次方）。
  - 单精度：通常可以表示7位十进制有效数字。这意味着当某个数的有效数字位数超过7位时，如果将其定义为单精度变量，超出的部分会自动四舍五入。
- f64, 64 位，双精度
  - 双精度：占用8个字节（64位）的存储空间。这同样包括1位符号位，但阶码扩展到11位，尾数则增加到52位。
  - 数值范围约为-2.23E308至1.79E308（即-2.23乘以10的308次方至1.79乘以10的308次方
  - 双精度：可以表示15或16位十进制有效数字。这提供了比单精度更高的精度，使得双精度浮点数能够更准确地表示具有大量有效数字的数值。

#### 数值操作

和其他语言一致

### boolean

占用 1 个字节。

`let r: bool = false;`

### 字符类型

- 需要使用双引号。

- rust 种使用 char 类型来描述单个字符
- 占用 4 字节大小
- 是 Unicode 标量值，可以比 ASCII 多很多内容：拼音、中日韩文、零长度空白字符串、emoji
  - 【 U+0000 到 U+D7FF 】
  - 【 U+E000 到 U+10FFFF 】

### 复合类型

可以将多个值放在一个变量里。Tuple 、Array

#### Tuple

- 可以将多个类型值放在一个类型里
- 长度固定

```rust
fn main() {
    let tup: (i32, f64, f64, u8) = (500, 6.2, 7.0, 1);

    let (x, y, z, g) = tup;

    println!("{}--{}--{}--{}--{}", x, y, z, g, tup.1);
    // 500--6.2--7--1--6.2
}
```

#### 数组

- 数组中的所有值类型必须相同
- 数组的长度是固定的
- 如果想让数据存放在 stack（桟）上而不是 heap（堆）上，或者想要保证有固定的数量，这时用数组更好

相对的就是 Vector，它比数组更灵活

### 推荐

- rust 权威指南
- vscode 工具 rust-analyzer , vscode 打开的项目根目录是 cargo 项目或者是 rust 项目才可用。
