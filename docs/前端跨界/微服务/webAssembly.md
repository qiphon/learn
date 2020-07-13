# webassembly 

- 高效
    - 有一套完整的语意，实际上 wasm 是体积小且加载快的二进制格式，
    其目标就是充分发挥硬件能力，达到原生执行效率
- 安全
    - 运行在一个沙箱环境中，甚至可以在现有的 js 虚拟机中实现。
    在web环境中，wasm 将会严格遵守同源策略以及浏览器安全策略

- 开放
    - 设计了一个非常规整的文本格式用来 调试、测试、实验、优化、学习、
    教育或者编写程序。可以以这种文本格式在web页面上查看 wasm 模块的源码

- 标准
    - wasm 在 web 中被设计成无版本、特性可测试、向后兼容的。 wasm
    可以被 js 调用，进入 js 上下文，也可以像 web API 一样调用浏览器的功能。
    当然，wasm 不仅可以运行在浏览器上，也可以运行在非 web 环境

- 流程对比
    ```
    js  -->   parse -> compile -> optimize -> execute -> GC

    wasm ---> Decode -> compile + Optimize -> Execute

    # 未来会支持 
    import module from 'test.wasm'
    # 现在可以使用 wasm-loader
    ```

### wasm 工具

- AssemblyScript: 支持直接将 TS 编译成 wasm。这对于前端来说，入门的门槛很低。
- Emscripten: 可以说是 wasm 的灵魂工具。将其它高级语言，编译成 wasm
- WABT：将 wasm 字节码和文本格式相互转换的一个工具，方便开发者去理解这个
wasm 到底是在做什么事

### js API 

- 方法
    - WebAssembly.compile((bufferSource))  加载
    - WebAssembly.instantiate(bufferSource, importObj)  初始化
    - WebAssembly.validate(bufferSource)  使其生效
- 类
    - WebAssembly.Module(bufferSource)  模块
    - WebAssembly.Instance(module, importObj)  处理实例
    - WebAssembly.Memory  内存相关
    - WebAssembly.Table  函数指针表
    - WebAssembly.CompileError  容错处理
    - WebAssembly.LinkError
    - WebAssembly.RuntimeError

- 推荐语言 c 、go 、rust

- c 示例

    ```c
    // hello.c
    #include <stdio.h>  // 引入标准输入输出库

    int main()
    {
        printf("hello world! \n");
        return 0;  
    }

    // 编译 gcc 编译文件 -o 输出文件
    > gcc hello.c -o hello
    // 执行
    ./hello

    // 转成 wasm 会生成一个 wasm 文件和一个 js 文件
    > emcc hello.c -o hello.js

                 js文件
              ↗
    .c 文件 --
              ↘ 
                 wasm 文件

    // exam.cpp
    // 复杂点的例子
    #include <stdio.h>
    #include <stdlib.h>  // c 标准库
    #include <math.h>  // 数学库

    // 相当于 js 的 export 
    extern "C" {
        float getSqr(float num)
        {
            return num * num;
        }

        float getSqrt(float num)
        {
            return sqrt(num);
        }
    }  

    // 编译 
    // 编译文件 -o js文件 c++文件 
    emcc exam.cpp -o exam.js exam.cpp \
    -Os -s WASM=1 \
    -s EXPORTED_FUNCTIONS="['_getSqr','_getSqrt']" 

    // 只编译成 wasm文件
    emcc ./src/math.c  -Os -s WASM=1 -o ./src/test.wasm -s EXPORTED_FUNCTIONS="['_add', '_square']"
    // webpack 中可直接引用 wasm文件，webpack5 需要添加 experiments:{syncWebAssembly: true,}, 
    // 直接使用 wasm 文件
    export const wasm = (function wasm(){
        return import('../program')
    })();


    import {wasm} from './utils'
    wasm.then(r => console.log(r, 'ww'))

    ```


    ```js
    //js 调用方法
    const WASM_URL = './exam.wasm'
    const WASM_JS_URL = './exam.js'

    const getWASMModule = () => {
        return new Promise((resolve, reject)=>{
            if( ! 'WebAssembly' in window){
                console.log('dose not support WebAssembly')
                reject(null)
            }
            fetch(WASM_URL).then(r=>r.arrayBuffer())
            .then(buffer => {
                const WASMModule = new WebAssembly.Module(buffer);
                const script = document.createElement('script')
                script.src = WASM_JS_URL

                script.addEventListener("wasmDone", buildWasm) 

                window.wasmScript = script

                window.wasmDoneEvent = new Event("wasmDone")

                document.body.appendChild(script)

                function buildWasm(){
                    Module.wasmBinary = buffer
                    const wasmMethods = {}
                    wasmMethods["getSqr"] = function(num){
                        return _getSqr(num)
                    }
                    wasmMethods["getSqrt"] = function(num){
                        return _getSqrt(num)
                    }
                    resolve(wasmMethods)
                }
            })
        })
    }

    ```
