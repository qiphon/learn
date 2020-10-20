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

### [vue2 生命周期](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

- beforeCreate，在实例初始化之后，数据检测 (data observer) 和 event/watcher 事件配置之前被调用。
- created，在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：
    - 数据检测 (data observer)，
    - 属性和方法的运算，
    - watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前尚不可用。
    
- beforeMount，在挂载开始之前被调用：相关的 render 函数首次被调用。
- mounted，实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了。 如果根实例挂载到了一个文档内的元素上，当mounted被调用时 vm.$el 也在文档内。
- beforeUpdate，数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
- updated，由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
- activated，被 keep-alive 缓存的组件激活时调用。
- deactivated，被 keep-alive 缓存的组件停用时调用。
- beforeDestroy，实例销毁之前调用。在这一步，实例仍然完全可用。
- destroyed，实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
- errorCaptured，当捕获一个来自子孙组件的错误时被调用。

[![生命周期展示图](https://cn.vuejs.org/images/lifecycle.png)](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

### 数据绑定



## Vue3

### 生命周期

hooks 名称变化

- beforeCreate -> use setup()
- created -> use setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destroyed -> onUnmounted
- activated -> onActivated
- deactivated -> onDeactivated
- errorCaptured -> onErrorCaptured

还有2个新增的api

- onRenderTracked
- onRenderTriggered

    ```js
    // 两个钩子都接收一个 DebuggerEvent，类似于观察者的 onTrack 和 onTrigger 选项:
    export default {
      onRenderTriggered(e) {
        debugger
        // inspect which dependency is causing the component to re-render
      }
    }
    ```

### setup

- *触发时间*： 它作为在组件内部使用 compositionapi 的入口点。在beforecreated 触发之前调用

- *使用模板*： 如果 setup 返回一个对象，对象上的属性将被合并到组件模板的渲染上下文中:

```js
<template>
  <div>{{ count }} {{ object.foo }}</div>
</template>

<script>
  import { ref, reactive } from 'vue'

  export default {
    setup() {
      // 注意，当在模板中访问时，从安装返回的 refs 会自动取消包装，
      // 因此不需要在模板中使用 ref.value 这种形式。
      const count = ref(0)
      const object = reactive({ foo: 'bar' })

      // expose to template
      return {
        count,
        object
      }
    }
  }
</script>
```

- jsx语法使用

```js
import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const object = reactive({ foo: 'bar' })

    return () => h('div', [count.value, object.foo])
  }
}
```

- setup 接收的参数第一个是 props（传递到组件上的参数），不能对这个props使用结构函数，否则props会变成非响应式的

```js
export default {
  props: {
    name: String
  },
  setup(props) {
    console.log(props.name)
  }
}

// props 可以是用 watchEffect 或 watch 观察和反应
// context  第二个参数, 可以得到 attr,slot,emit
// 如果 setup 返回一个对象，对象上的属性将被合并到组件模板的渲染上下文中
export default {
  props: {
    name: String
  },
  setup(props, context) {
    console.log(context, 'context')
    // props
    // context.attrs
    // context.slots
    // context.emit
    watchEffect(() => {
      console.log(`name is: ` + props.name)
    })
    return {
      msg: '这里的数据组件可以直接使用',
      test: 'test'
    }
  }
}

// ！不要解构 props 中的数据,
// this 的值不再可以使用，现在this 是undefine
export default {
  props: {
    name: String
  },
  setup({name}) {
    // this  ==> undefine
    console.log(name)
  }
}


// 类型
interface Data {
  [key: string]: unknown
}

interface SetupContext {
  attrs: Data
  slots: Slots
  emit: (event: string, ...args: unknown[]) => void
}

function setup(props: Data, context: SetupContext): Data
```

### reactive 参数必须是一个对象

被 reactive 方法包裹后的 对象 就变成了一个代理对象，相当于 Vue2.x 中的 Vue.observable()。也就可以实现页面和数据之间的双向绑定了。

这个包裹的方法是 deep 的，对所有嵌套的属性都生效。

注意： 一般约定 reactive 的参数是一个对象，而下文提到的 ref 的参数是一个基本元素。但如果反过来也是可以的，reactive 其实可以是任意值，比如：reactive(123) 也是可以变成一个代理元素，可以实现双向绑定。

作者：村口蹲一郎
链接：https://juejin.im/post/6844904110198620167
https://juejin.im/post/6844904114791383047
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。