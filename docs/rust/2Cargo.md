# Cargo 

cargo 是rust 中的包管理工具

### 常用命令 

`$ cargo --version ` 查看版本

`cargo new hello_cargo` 创建一个新项目


常用命令 |	解释 |
--|--|
cargo | new    |	新建一个项目
cargo | build  |	编译构建项目
cargo | run    |	编译运行项目
cargo | doc    |	创建项目的文档
cargo | test   |	测试项目
cargo | check  |	与 run 命令一致，只是不会执行打包好的项目，他的执行速度要比cargo build 要快，因为它不会生成可执行文件

### cargo 创建一个项目 

```sh
# Usage: cargo new --name <Package_NAME> <dir_path>
cargo new --name cargo_start ./2_cargo_start

# 生成目录结构如下
# 2_cargo_start
# ├── Cargo.toml
# └── src
#     └── main.rs
```

### 项目编译

cargo build 可以执行项目编译，默认情况会以debug 模式执行编译， 同时会生成一个 Cargo.lock 文件，记录项目编译时使用的依赖版本

```sh 
cargo build 

# 项目目录多出了target目录，当前的目录结构如下：
# ├── Cargo.lock
# ├── Cargo.toml
# ├── src
# │   └── main.rs
# └── target
#     ├── CACHEDIR.TAG
#     └── debug
#         ├── build
#         ├── cargo_start   // 编译后的执行文件
#         ├── cargo_start.d
#         ├── deps
#         │   ├── cargo_start-0cb3602898854f2e
#         │   ├── cargo_start-0cb3602898854f2e.1c6i2o37lq7g2ybg.rcgu.o
#         │   ├── cargo_start-0cb3602898854f2e.2n5sgtcsdwdsxwwb.rcgu.o
#         │   ├── cargo_start-0cb3602898854f2e.4yl1mumyr7on8846.rcgu.o
#         │   ├── cargo_start-0cb3602898854f2e.545jkgg077xkm8gd.rcgu.o
#         │   ├── cargo_start-0cb3602898854f2e.60g5vm5bm90fqpt.rcgu.o
#         │   ├── cargo_start-0cb3602898854f2e.d
#         │   └── cargo_start-0cb3602898854f2e.lx8rux5alqweq1z.rcgu.o
#         ├── examples
#         └── incremental
#             └── cargo_start-1jwvodl7lx4az
#                 ├── s-ghil67iror-3k5axa-3a9syfbpjquri
#                 │   ├── 1c6i2o37lq7g2ybg.o
#                 │   ├── 2n5sgtcsdwdsxwwb.o
#                 │   ├── 4yl1mumyr7on8846.o
#                 │   ├── 545jkgg077xkm8gd.o
#                 │   ├── 60g5vm5bm90fqpt.o
#                 │   ├── dep-graph.bin
#                 │   ├── lx8rux5alqweq1z.o
#                 │   ├── query-cache.bin
#                 │   └── work-products.bin
#                 └── s-ghil67iror-3k5axa.lock
```

[toml](https://toml.io/en/) 是 cargo 配置语言

src/main.rs 文件是项目的主要文件

### 项目执行

cargo run 命令是先执行编译，后执行可执行项目

```sh
cargo run 

#    Compiling cargo_start v0.1.0 (Desktop/github/learn/docs/rust/demo/2_cargo_start)
#     Finished dev [unoptimized + debuginfo] target(s) in 0.92s
#      Running `target/debug/cargo_start`
# Hello, world!
```

### Building for Release

release 命令需要在执行 check 之后执行，`cargo build --release` , 会生成一个 release 文件夹, 可执行文件放在 `target/release/deps` 文件里


### cargo doc

会生成文件 `target/doc/cargo_start/index.html` , rust 的注释要使用 `///` 不然，注释不能正确显示出来