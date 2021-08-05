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

- 移除了 filter

### setup

- *触发时间*： 它作为在组件内部使用 compositionapi 的入口点。setup是在一个组件实例被创建时，初始化了 props 之后调用,在beforecreated 触发之前调用

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

- 第二个参数 context（{attr, slots, emit}）它不是响应式的，可以使用解构

```js
export default {
  props: {
    name: String
  },
  setup(props) {
    console.log(props.name)
  }
}

const App1 = {
  template: `
      <div>
        <div>{{ count }} {{ object.foo }}</div>
      </div>
    `,
  // setup是在一个组件实例被创建时，初始化了 props 之后调用
  //  相当于vue2的beforeCreate,created
  setup() {
    const count = ref(0);
    const object = reactive({ foo: "bar" });
    // expose to template
    // setup返回一个对象，对象中的属性将直接暴露给模板渲染的上下文。
    return {
      count,
      object,
    };
  },
};
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
    // 除此之外，还可以直接通过 watch 方法来观察某个 prop 的变动，这是为什么呢？
    // props本身在源码中，也是一个被 reactive 包裹后的对象，因此它具有响应性，所以在watch 方法中的回调函数会自动收集依赖，
    // 当name变动后，会自动调用这些回调逻辑。
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

### [defineComponent](https://v3.vuejs.org/api/global-api.html#definecomponent) 

这个函数仅仅提供了类型推断，方便在结合 TypeScript 书写代码时，能为 setup() 中的 props 提供完整的类型推断。

```js
const { defineComponent } = Vue;
const defineComponent = {
  props: {
    name: String,
  },
  setup(props) {
    console.log(props.name);
  },
};
```

### reactive 参数必须是一个对象

被 reactive 方法包裹后的 对象 就变成了一个代理对象，相当于 Vue2.x 中的 Vue.observable()。也就可以实现页面和数据之间的双向绑定了。

这个包裹的方法是 deep 的，对所有嵌套的属性都生效。

注意： 一般约定 reactive 的参数是一个对象，而下文提到的 ref 的参数是一个基本元素。

```js
import { defineComponent, watchEffect, reactive } from 'vue';

const HelloWorld = defineComponent({
  setup(props, context) {
    const d = reactive({ msg: 12399 });
    // const n = reactive(13); // reactive 的参数必须是一个对象
    console.log(context, 'context');
    setTimeout(() => {
      d.msg = 222;
    }, 3000);
    watchEffect(() => {
      console.log(d, 'msg---');
      return d;
    });
    return {
      d,
      ab: 'aaa',
    };
  },
});

export default HelloWorld;
```

### ref、isRef、toRefs

- 被 ref 方法包裹后的 元素 就变成了一个代理对象。一般而言，这里的元素参数指 基本元素 或者称之为 inner value，
  如：number, string, boolean,null,undefied 等，object 一般不使用 ref，而是使用上文的 reactive。
  也就是说 ref 一般适用于某个元素的；而 reactive 适用于一个对象。
  ref 也就相当于把单个元素转换成一个 reactive 对象了，对象默认的键值名是：value。

```js
import { defineComponent, watchEffect, reactive, ref, Ref } from 'vue';

const HelloWorld = defineComponent({
// template 中使用 ref 时，不需要再使用 .value
  template: `
        <div>{{ n }}</div>
    `,
  setup(props, context) {
    // ts 写法
    const n: Ref<number | string> = ref(10);
    // reactive 中使用 ref的值时，也不需要使用 .value 的形式
    const d = reactive({
      msg: 12399,
      num: n,
    });

    // 如果不是作为对象访问，则需要通过.value进行访问，例如array,map
    const arr = reactive([ref(0)]);
    // need .value here
    console.log(arr[0].value);
    const map = reactive(new Map([["foo", ref(0)]]));
    // need .value here
    console.log(map.get("foo").value);


    setTimeout(() => {
      n.value = 'new value';
    }, 3000);
    return {
      n,
    };
  },
});

export default HelloWorld;
```

#### isRef 用来判断一个值是不是 ref

```js
// 用法
const unwrapped = isRef(foo) ? foo.value : foo;

// typing
function isRef(value: any): value is Ref<any>

```

#### toRefs 可以将一个reactive 对象打平，变成单个的ref，方便在模板中使用

```js
const HelloWorld = defineComponent({
  setup(props, context) {
    const n: Ref<number | string> = ref(10);
    const d = reactive({
      msg: 12399,
      num: n,
    });
    // const n = reactive(13); // reactive 的参数必须是一个对象
    setTimeout(() => {
      d.msg = 222;
      n.value = 'new value';
    }, 3000);
    watchEffect(() => {
      console.log(d, 'msg---');
      return d;
    });
    return {
      ab: 'aaa',
      n,
      // d,
      ...toRefs(d),
    };
  },
});

export default HelloWorld;
```

### computed 

- 计算值的行为跟计算属性 (computed property) 一样：只有当依赖变化的时候它才会被重新计算。类型某act的useCallback useMemo 
- computed() 返回的是一个ref包装对象，它可以和普通的包装对象一样在 setup() 中被返回 ，也一样会在渲染上下文中被自动展开。

```js
// 直接传一个函数,返回你所依赖的值的计算结果，这个值是个包装对象，默认情况下，如果用户试图去修改一个只读包装对象，会触发警告，
// 说白了就是你只能get无法set
setup() {
    const count = ref(1);
    // computed() 函数的返回值是一个 ref 的实例
    // 根据 count 的值，创建一个响应式的计算属性 plusOne
    // 它会根据依赖的 ref 自动计算并返回一个新的 ref
    const plusOne = computed(() => count.value + 1);
    console.log(plusOne); // 打印结果可以看到isRef为true
    console.log(plusOne.value); // 2
    plusOne.value++; // 触发警告,默认情况下，如果用户试图去修改一个只读包装对象，会触发警告
  },


// set、get

const HelloWorld = defineComponent({
  setup(props, context) {
    const n: Ref<number> = ref(10);
    const d = reactive({
      msg: 12399,
      num: n,
    });
    // 如果没有指定set，computed 的值为 readonly
    // const num2 = computed(() => n.value ** 2);
    const num2 = computed({
      get() {
        return n.value ** 3;
      },
      set(val) {
        n.value = 22;
      },
    });
    // computed 返回的也是一个ref
    setTimeout(() => {
      num2.value = 20;
    }, 1000);
    return {
      ab: 'aaa',
      n,
      num2,
      // d,
      ...toRefs(d),
    };
  },
});

// ts
function computed<T>(getter: () => T): Readonly<Ref<Readonly<T>>>

// writable
function computed<T>(options: {
  get: () => T,
  set: (value: T) => void
}): Ref<T> 
```

### readonly

接收一个ref或者reactive包装对象，返回一个只读的响应式对象。

```js
const HelloWorld = defineComponent({
  setup(props, context) {
    const d = reactive({
      msg: 12399,
      num: n,
    });
    const num2 = computed({
      get() {
        return n.value ** 3;
      },
      set(val) {
        n.value = 22;
      },
    });
    const copy = readonly(num2);
    setTimeout(() => {
      num2.value = 20;
    }, 1000);
    return {
      num2,
      copy,
    };
  },
});
```

### watchEffect

当响应数据（reactive、ref）变化时，会立即执行的函数

```js
const HelloWorld = defineComponent({
  setup(props, context) {
    const n: Ref<number> = ref(10);
    const num2 = computed({
      get() {
        return n.value ** 3;
      },
      set(val) {
        n.value = 22;
      },
    });
    watchEffect(() => {
      console.log(num2.value, 'num2');
    });
    setTimeout(() => {
      num2.value = 20;
    }, 1000);
    return {
      n,
      num2,
    };
  },
});
```

当在组件的 setup ()函数或生命周期钩子期间调用 watchEffect 时，监视器被链接到组件的生命周期，并且在卸载组件时自动停止。

在其他情况下，它返回一个 stop 句柄，可以调用这个句柄来显式地停止 watchEffect

```js
setup(props, context) {
  const n: Ref<number> = ref(10);
  const d = reactive({
    msg: 12399,
    num: n,
  });
  // 如果没有指定set，computed 的值为 readonly
  // const num2 = computed(() => n.value ** 2);
  // type nums = computed<T>(option: {}): Ref<T>
  const num2 = computed({
    get() {
      return n.value ** 3;
    },
    set(val) {
      n.value = 22;
    },
  });
  const stop = watchEffect(() => {
    console.log(num2.value, 'num2');
  });
  stop();
  setTimeout(() => {
    num2.value = 20;
  }, 1000);
  return {
    ab: 'aaa',
    n,
    num2,
    // d,
    ...toRefs(d),
  };
},
```

当watchEffect 中执行一个异步的副作用时，可能在下一次触发watchEffect 的时候需要重置那个异步的 Effect，这个时候可以使用 onInvalidate

watchEffect 执行的条件： 
- reactive 数据变化
- watcher 终止的时候

```js
watchEffect(onInvalidate => {
  const token = performAsyncOperation(id.value)
  onInvalidate(() => {
    // id has changed or watcher is stopped.
    // invalidate previously pending async operation
    token.cancel()
  })
})

// 我们通过传入函数注册失效回调，而不是从回调返回，因为返回值对异步错误处理很重要。在执行数据获取时，effect 函数是一个异步函数是很常见的:
// 异步函数隐式返回一个 Promise，但需要在 Promise 解析之前立即注册清理函数。此外，Vue 依靠返回的 Promise 自动处理 Promise 链中的潜在错误。
setup() {
    const data = ref(null);
    function async() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("async数据");
        }, 2000);
      });
    }
    watchEffect(async () => {
      data.value = await async();
    });
  },


/* ------------------Effect Flush Timing-------------------- */
/* 
    Vue's reactivity system buffers invalidated effects and flush them asynchronously 
    to avoid unnecessary duplicate invocation when there are many state mutations happening in the same "tick". 
    Internally, a component's update function is also a watched effect. When a user effect is queued, 
    it is always invoked after all component update effects:
    
*/

/* 
    In this example:
    // 在这个例子中
    The count will be logged synchronously on initial run.
    count将会在初始运行的时候被同步记录
    When count is mutated, the callback will be called after the component has updated. 
    更新count时，会在组件更新后触发watchEffect的回调
*/
const App4 = {
  template: `
        <div>{{count}}<button >点击</button></div>
    `,
  setup() {
    const count = ref(0);
    watchEffect(() => {
      console.log(count.value);
    });
    return {
      count,
    };
  },
};
```

watchEffect 会在组件挂载前触发，如果要在它里面操作 DOM ，需要使用 onMounted 包裹 watchEffect

```js
const App4_1 = {
  template: `
    <div>{{count}}</div>
`,
  setup() {
    const count = ref(0);
    onMounted(() => {
      watchEffect(() => {
        // access the DOM or template refs
        // 现在组件已经被挂载
      });
    });
    return {
      count,
    };
  },
};
```

回调时机

    默认情况下，所有的 watch 回调都会在当前的 renderer flush 之后被调用。这确保了在回调中 DOM 永远都已经被更新完毕。
    如果你想要让回调在 DOM 更新之前或是被同步触发，可以使用 flush 选项：
In cases where a watcher effect needs to be re-run synchronously or before component updates, 
we can pass an additional options object with the flush option (default is 'post'):

控制watch回调调用时机

- 默认情况下，watchEffect会在组件更新之后调用，如果你想在组件更新前调用，你可以传第三个参数，第三个参数是个对象，有几个选项
    - flush  表示回调调用时机
          - post 默认值，在组件更新之后
          - pre 组件更新之前
          - sync 同步调用

```js
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'post'
  }
)
```

WatchEffect Debug 仅在开发模式有效

- `onTrack` will be called when a reactive property or ref is tracked as a dependency 当 reactive 属性或 ref 被跟踪为依赖项时，将调用
- `onTrigger` will be called when the watcher callback is triggered by the mutation of a dependency 当依赖关系的变异触发观察者回调时，将调用

```js
watchEffect(
  () => {
    /* side effect */
    console.log(num.value);
  },
  {
    onTrigger(e) {
      debugger;
    },
  }
);

/* ------------------Typing-------------------- */

/* 
    function watchEffect(
      effect: (onInvalidate: InvalidateCbRegistrator) => void,
      options?: WatchEffectOptions
    ): StopHandle

    interface WatchEffectOptions {
      flush?: 'pre' | 'post' | 'sync'
      onTrack?: (event: DebuggerEvent) => void
      onTrigger?: (event: DebuggerEvent) => void
    }

    interface DebuggerEvent {
      effect: ReactiveEffect
      target: any
      type: OperationTypes
      key: string | symbol | undefined
    }

    type InvalidateCbRegistrator = (invalidate: () => void) => void

    type StopHandle = () => void
*/
```

### watch

watch() API 提供了基于观察状态的变化来执行副作用的能力。
- watch(source,cb,options?)
- watch() 接收三个参数
    1. 第一个参数被称作 “数据源”，它可以是：
        - 一个返回任意值的函数
        - 一个包装对象
        - 一个包含上述两种数据源的数组
        - source：可以是getter函数，值包装器或包含上述两种类型的数组（如果要查看多个源）

    2. 第二个参数是回调函数。回调函数只有当数据源发生变动时才会被触发：

        - callback：是类似于Vue2 watcher处理程序的函数，带有2个参数：newVal，oldVal。
        每个参数都可以是一个数组(用于观察多个源): [newVal1，newVal2，... newValN]，[oldVal1，oldVal2，... oldValN]
        - callback 第三个参数 onInvalidate 和 watchEffect 中相同

    3. 第三个可选参数options,
        - deep 深度监听
            - 类型: boolean  default :false
            - 和Vue2.x行为一致，都是对对象的深度监听
        - Lazy - 和Vue2.x immediate 正好相反
            - 类型:Boolean, default:false

- 与 watchEffect 一样，同样支持手动停止监听
- Compared to watchEffect, watch allows us to:
    - Perform the side effect lazily;
    - Be more specific about what state should trigger the watcher to re-run;
    - Access both the previous and current value of the watched state.

```js
watch(
  [fooRef, barRef],
  ([foo, bar], [prevFoo, prevBar], oninvalidate) => {
  /* ... */
  },
  { 
    // 默认就是lazy,在 watch 被创建的时候，不执行回调函数中的代码
    // 比如这里设置watch的可选参数options选项，immediate,则在创建的时候会立即执行
    //源码中： function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
    immediate: true,
    deep: true, 
  }
)

/* ----------------Typing----------------- */
/* 
// wacthing single source
function watch<T>(
  source: WatcherSource<T>,
  callback: (
    value: T,
    oldValue: T,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options?: WatchOptions
): StopHandle

// watching multiple sources
function watch<T extends WatcherSource<unknown>[]>(
  sources: T
  callback: (
    values: MapSources<T>,
    oldValues: MapSources<T>,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options? : WatchOptions
): StopHandle

type WatcherSource<T> = Ref<T> | (() => T)

type MapSources<T> = {
  [K in keyof T]: T[K] extends WatcherSource<infer V> ? V : never
}

// see `watchEffect` typing for shared options
interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // default: false
  deep?: boolean
}
*/
```

### nextTick

Defer the callback to be executed after the next DOM update cycle. Use it immediately after you’ve changed some data to wait for the DOM update.

推迟事件到下一个更新周期执行，通常用它来操作数据变动后的dom

```js
import { createApp, nextTick } from 'vue'

const app = createApp({
  setup() {
    const message = ref('Hello!')
    const changeMessage = async newMessage => {
      message.value = newMessage
      await nextTick()
      console.log('Now DOM is updated')
    }
  }
})

// 也可以在watch 中
const stop = watch(num2, async (next, pre, oninvalidate) => {
  console.log(
    num2,
    next,
    pre,
    111,
    document.querySelector('#num2')!.innerHTML,
  ); // "1000 ===== num2"
  await nextTick();
  console.log(
    num2,
    next,
    pre,
    111,
    'nextTick',
    document.querySelector('#num2')!.innerHTML,
  ); // "nextTick" "10648 ===== num2"
});
```

### provider 、 inject

/* -----------------provide&inject用法共享普通数据--------------- */

依靠依赖注入，我们可以跨组共享数据

你甚至可以在不依赖VueX的前提下，实现全局状态共享。熟悉React的同学知道，这和React的context类似。

provide接受两个参数，

- 第一个参数是provide唯一名称，最好用Symbol,避免重复。
- 第二个参数是你要暴露的数据

inject accepts an optional default value as the 2nd argument. 
If a default value is not provided and the property is not found on the provide context, 
inject returns undefined.

inject 接收两个参数

- 第一个参数是provide名称，
- 第二个参数是默认数据

如果provider没有暴露自己的数据，那么使用inject默认数据。
*/

```js
/* -----------------Typing-------------------- */
/* 
interface InjectionKey<T> extends Symbol {}

function provide<T>(key: InjectionKey<T> | string, value: T): void

// without default value
function inject<T>(key: InjectionKey<T> | string): T | undefined
// with default value
function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

// Vue provides a InjectionKey interface which is a generic type that extends Symbol. 
// It can be used to sync the type of the injected value between the provider and the consumer:
import { InjectionKey, provide, inject } from 'vue'

const key: InjectionKey<string> = Symbol()

provide(key, 'foo') // providing non-string value will result in error

const foo = inject(key) // type of foo: string | undefined

// If using string keys or non-typed symbols, the type of the injected value will need to be explicitly declared:
const foo = inject<string>('foo') // string | undefined

*/

/* -----------------总结------------------ */
/* 
    1.provide+inject 取代Vuex
        类似React的 Context + useReducer 一定程度上可以取代redux一样，效果也非常不错。
        而Vue项目中，如果你不想引入Vuex,也可以考虑用provide+inject取代它。
*/
```

作者：村口蹲一郎
链接：https://juejin.im/post/6844904110198620167
https://juejin.im/post/6844904114791383047
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。