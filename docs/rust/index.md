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

## 数据类型

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

### 推荐

- rust 权威指南
