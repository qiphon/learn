# Vue 

## Vue2

### 什么是vue？

- 一套用于构造用户界面的渐进式框架
- 采用自下向上的增量开发设计
- 核心库只关心视图层，易于上手
- 可驱动采用单文件组建和 Vue 生态系统支持的库开发复杂单页应用

###  渐进式框架

```
# 从内向外结构如下

Declarative            Component         Client-Side     Large Scale State     Build
Rendering       ---->  System      ----> Routing    ---> Management       ---> System
声明式渲染               组建系统           客户端路由        大规模状态管理          构建工具

```
### 为什么学习vue

- 声明拾渲染
    - vue 核心就是一个允许采用简洁的模板语法来声明式的将数据渲染进DOM 系统
    ```html
    <div id="app">
        <p>{{ msg }}</p>
    </div>
    <script src="vue.js"></script>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                msg: 'hello world'
            }
        })
    </script>
    ```

- 响应式数据绑定
    ```
                        ViewModel

                        dom listeners   ------------------->
    View                                                      Model
                        data bindings  <-------------------

    DOM                 VUE                                  PLAIN JAVASCRIPT OBJECT                    
    ```

- 组件开发
    > 组件系统是 Vue 的另外一个非常重要的概念，因为它是一种抽象，允许我们使用小型、独立和可附庸的组建构建大型应用

- Virtual Dom
    > 减少dom操作，提升渲染能力

### vue 生命周期

- beforecreate

- created

- beforemount

- mounted

- beforeupdate

- updated

- beforedestoy

- destroyed

### 数据绑定



## Vue3

