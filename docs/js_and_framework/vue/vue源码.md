# vue 

特点： 

- 渐进式、js框架

    Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

    白话：掌握组件的写法就可以写出一个简单的页面，
         学习路由之后页面就变得更灵活，
         项目再大了，可以引入状态管理系统，
         为了更好的开发，我们可以模块化开发。可以一层层的增加项目即渐进

- 易用、灵活、高效

    易用：提供数据响应式、声明式模板语法和基于配置的组件系统等核心特性。只需js、css、html即可上手

    灵活：即它的渐进式特性，让项目根据需要自定义配置额外项

    高效：虚拟dom + diff算法 

## vue 2

### vue2 源码 思想 设计

- 源码结构

    ```
    ----------------
    |--  dist  打包后文件 
    |    |--  common
    |    |--  esm
    |    |--  no
    |    |--  runtime    vue运行时  （vue代码在执行器运行的过程中保存的一种状态） 运行过程中状态的描述
    |    |      - vue 通过 webpack + vue 离线编译
    |    |--  runtime + compiler  
    |            - 在线编译
    |
    |-- flow  一个框架   ： ts 一门语言（需要编译器）  --> 规范变量类型
    |
    |-- packages  lerna 多包管理工具
    |
    |-- scripts  打包脚本
    |
    |-- src      逻辑代码
    |     |-- compiler  编译模板
    |     |-- core      vue核心逻辑代码
    |     |    |-- components   keep-alive 实现
    |     |    |-- global-api   全局 vue属性方法
    |     |    |-- instance     vue 实例  生命周期、初始化
    |     |    |-- observer     数据收集与订阅
    |     |    |-- util         常用工具类
    |     |    |-- vdom         虚拟dom
    |     |
    |     |-- platforms  针对平台的编译代码（web、weex）
    |     |-- server     处理服务端渲染的目录
    |     |-- sfc        处理 .vue 文件
    |     |-- shared     全局工具函数
    |     
    |-- scripts
    |     |
    |     |-- config.js
    |     |       Runtime only(运行时)。。。。
    |     |
    |     |
    |
    |--- benchmarks  跑分（性能）

    ```

> vue 的组成是由 core + *对应平台补充代码* 构成

```
<template>
</template>
<script>
</script>
<style></style>
```

离线编译

template + script ==> webpack ==> js ==> html(vue runtime)

```js
// 这种需要在线编译
new Vue({
    template: '<div>{{msg}}</div>'
})
```

在线编译

template ==> js 解析 ==> wwith() ==> render

ssr

vue-server-renderer ===> js ===> VM (node)

ssr 并发过大，可以将代码放到cdn

### 双向数据绑定

- object.defineProperty
    - 数组重写
    - get 订阅 set 派发

- observer  数据监听，把数据处理成响应数据 通过 object.defineProperty
                                    -->array
                                    --> object
    ```js
    new Observer(data)   --->  是否是数组
        是 --> 重写数组 
            --> [].__proto__ = ArrayMethod{} (继承了原来的数组方法  def 拦截)
        否 --> this.walk  --> object.keys -> 遍历所有的key （Object.defineProperty）
            --> get  把所有的依赖收集 dep.push
            --> set  分发，遍历数组


    // 重写会导致数据变化的方法，（防止触发多次 set、get）
    

    // observer 文件夹说明
        - index  主要的 Observer 逻辑
        - array  重写array方法
        - dep    订阅机制
        - watcher 指令记录
        - scheduler 
        - traverse  递归遍历数据，把dep.id放到set中，没有使用
    ```

- watcher   连接数据和指令

    Dep 收集的是 watcher 而不是指令
    watcher 是将模板和 Observer对象链接在一起的纽带。watcher 是订阅者模式中的订阅者。watcher的2个参数： expOrFn 最终会被转化为getter函数，cb是更新时执行的回调，依赖收集的入口就是get函数

- dep    订阅、分发

    ```js
    addsub  添加监听  数组push
    notify  分发   数组遍历，执行更新
    ```

- directive   指令 渲染、执行事件
    - v-if
    - v-html
    - v-on

- 数据绑定模式

    ```
                                                                    数据监听
                每个指令对应一个watcher          订阅、发布管理      |----------|
    directive   ⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆  watcher ⇆⇆⇆⇆⇆ Dep  ⇆⇆⇆⇆⇆⇆ | Observer |
        ⇓                                                          |  getter  |       
        ⇓                                                          |  setter  |
        {{}}、v-if、v-model ...                                     |----------|

    ```
### 初始化过程

- observer 处理数据
    - Dep 收集依赖 --> watcher
- compile  编译模板
- watcher  指令数据连接器
    - get 获取数据 触发get --> Dep.target --> addSub --> 不同的方法执行，处理视图
    - set 修改数据 --> notify --> 遍历 watcher --> watcher.update --> get
        
- lru 算法

### 渲染方式

mount 和 update 是组件渲染的2个途径

#### 初始化渲染

```
$mount -> mountComponent -> updateComponent (vm._update(vm._render())) -> vm._render -> vm._update -> patch -> createElm -> insert

```


#### 数据更新渲染

```
set-> dep.notify -> watcher.update -> watcher.run -> -> updateComponent -> _update -> patch 
```

### diff

挂载组件  `vue/src/core/instance/lifecyle  >> mountComponent`

```js
// 每个组件都有一个watcher
// we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
```

diff 的内容在 `vue/src/core/vdom/patch.js  >> patchVnode `

策略：深度优先 

diff 比较子节点 `vue/src/core/vdom/patch.js  >> updateChildren `

```js
// sameVnode
/** 
 * 1. 新旧节点是否有相同的key && 2或3
 * 2. 标签名相同、注释占位、有数据、input的type相同
 * 3. 是异步组件、相同的构造函数、构造函数有error属性
*/
function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}


```

双指针判断过程

1. oldStartVnode如果不存在，oldStartVnode=下一个就节点的值 oindex ++
2. oldEndVnode 如果不存在，oldEndVnode等于前一个节点的值 oIndex--
3. oldStartVnode 、newStartVnode相同，继续比较下一个。++oldStartIdx、++newStartIdx
4. oldEndVnode 、newEndVnode 相同，继续比较下一个。++oldEndIdx、++newEndIdx
5. oldStartVnode, newEndVnode 老头 vs 新尾如果相同。执行插入操作
6. oldEndVnode, newStartVnode 老尾 vs 新头如果相同。执行插入操作
7. 将剩余没有比较的oldch生成一个map键为oldItem的key，值为 oldItem的index去和新的key比较，
有相同开始比较，没相同创建新的


#### diff总结

- diff是虚拟dom的产物，通过新旧虚拟dom的比较，将变化内容更新到真实的dom上。
- vue2中，每个组件都有一个watcher与之对应，需要diff来找到变化的地方
- vue中当组件执行更新函数时开始进行diff，比较之后形成patch（补丁）更新
- diff为深度优先策略，2个节点的比较会根据是否是文本节点或有没有子节点做不同的操作；

    diff 比较方式：先对头尾节点可能相同，做4次比较，如果没有找到相同的节点，按照普通的遍历方式遍历查找，查找结束再根据情况处理剩下的节点；借助key，可以更高效的判断2个节点是否相同，提高patch效率

key在dom diff 中的作用：

1. diff中主要时通过key 判断2个节点是不是同一个，从而避免频繁更新相同的元素，使diff更精准。
2. 相同标签名的过渡切换过程中也会用到key属性，vue需要用它来区分是不是相同的元素，保证过渡正确触发，防止出现只有属性发生变更

#### 为什么data必须是一个函数

vue的组件可以存在多个实例，如果用object形式定义data会导致多个实例共用一个data。这样多个实例之间就会相互影响。通过函数方式再initState时会将其作为工厂函数返回给data对象。

```js
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // 部分代码截取
```

为什么跟组件可以使用object形式： 

因为跟组件是个单例，它只会用一次，所以不必考虑这个问题

#### v-if 、 v-for

源码位置 `vue/src/compiler/codegen/index.js`

```js
export function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
```

由代码可以看出 v-for 会先于 v-if 执行。

所以写代码时要注意：尽量不要将 v-if 和 v-for 放到同级，最好将其放到 v-for 的外面以减少判断逻辑。也可以使用计算属性过滤掉不需要渲染的内容。以做到性能优化

### vue3 

#### 变化

更快：

- 虚拟 dom 重写，编译器从 regexp -> 

    组件快速路径 + 单个调用 + 子节点类型检测

- 优化 slot 生成

    单独重新渲染父级和子集

- 静态树、属性处理

    跳过处理整个树，patch更快

- 基于proxy的响应处理

    内存占用更低，组件实例化速度更快，但是兼容性下降

更小：tree shaking 减少库文件大小

更好的维护性：typescript支持更好

新增函数api，写起来更舒适

跨平台支持的更好，有独立的编译器

#### proxy 

```js
// vue.runtime.esm-brower.js
// 944 proxy
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers) {
    if (!isObject(target)) {
        {
            console.warn(`value cannot be made reactive: ${String(target)}`);
        }
        return target;
    }
    // target is already a Proxy, return it.
    // exception: calling readonly() on a reactive object
    if (target["__v_raw" /* RAW */] &&
        !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */])) {
        return target;
    }
    // target already has corresponding Proxy
    const proxyMap = isReadonly ? readonlyMap : reactiveMap;
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
        return existingProxy;
    }
    // only a whitelist of value types can be observed.
    const targetType = getTargetType(target);
    if (targetType === 0 /* INVALID */) {
        return target;
    }
    const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
}
// 858
function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow
        ? shallowInstrumentations
        : isReadonly
            ? readonlyInstrumentations
            : mutableInstrumentations;
    return (target, key, receiver) => {
        if (key === "__v_isReactive" /* IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "__v_isReadonly" /* IS_READONLY */) {
            return isReadonly;
        }
        else if (key === "__v_raw" /* RAW */) {
            return target;
        }
        return Reflect.get(hasOwn(instrumentations, key) && key in target
            ? instrumentations
            : target, key, receiver);
    };
}
```

#### diff 

```js
// vue.runtime.esm-browser.js
// line 5300
/*
  @params c1 oldvnode
  @params c2 newvnode
*/
 const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0; i < commonLength; i++) {
          const nextChild = (c2[i] = optimized
              ? cloneIfMounted(c2[i])
              : normalizeVNode(c2[i]));
          patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, optimized);
      }
      if (oldLength > newLength) {
          // remove old
          unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
      }
      else {
          // mount new
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, commonLength);
      }
  };
```

```js
// vue.runtime.esm-brower.js
// 5323
const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1; // prev ending index
    let e2 = l2 - 1; // next ending index
    // 1. sync from start
    // (a b) c
    // (a b) d e
    while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = (c2[i] = optimized
            ? cloneIfMounted(c2[i])
            : normalizeVNode(c2[i]));
        if (isSameVNodeType(n1, n2)) {
            patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, optimized);
        }
        else {
            break;
        }
        i++;
    }
    // 2. sync from end
    // a (b c)
    // d e (b c)
    while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = (c2[e2] = optimized
            ? cloneIfMounted(c2[e2])
            : normalizeVNode(c2[e2]));
        if (isSameVNodeType(n1, n2)) {
            patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, optimized);
        }
        else {
            break;
        }
        e1--;
        e2--;
    }
    // 3. common sequence + mount
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0
    if (i > e1) {
        if (i <= e2) {
            const nextPos = e2 + 1;
            const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
            while (i <= e2) {
                patch(null, (c2[i] = optimized
                    ? cloneIfMounted(c2[i])
                    : normalizeVNode(c2[i])), container, anchor, parentComponent, parentSuspense, isSVG);
                i++;
            }
        }
    }
    // 4. common sequence + unmount
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1
    else if (i > e2) {
        while (i <= e1) {
            unmount(c1[i], parentComponent, parentSuspense, true);
            i++;
        }
    }
    // 5. unknown sequence
    // [i ... e1 + 1]: a b [c d e] f g
    // [i ... e2 + 1]: a b [e d c h] f g
    // i = 2, e1 = 4, e2 = 5
    else {
        const s1 = i; // prev starting index
        const s2 = i; // next starting index
        // 5.1 build key:index map for newChildren
        const keyToNewIndexMap = new Map();
        for (i = s2; i <= e2; i++) {
            const nextChild = (c2[i] = optimized
                ? cloneIfMounted(c2[i])
                : normalizeVNode(c2[i]));
            if (nextChild.key != null) {
                if ( keyToNewIndexMap.has(nextChild.key)) {
                    warn(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
                }
                keyToNewIndexMap.set(nextChild.key, i);
            }
        }
        // 5.2 loop through old children left to be patched and try to patch
        // matching nodes & remove nodes that are no longer present
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        // used to track whether any node has moved
        let maxNewIndexSoFar = 0;
        // works as Map<newIndex, oldIndex>
        // Note that oldIndex is offset by +1
        // and oldIndex = 0 is a special value indicating the new node has
        // no corresponding old node.
        // used for determining longest stable subsequence
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++)
            newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
            const prevChild = c1[i];
            if (patched >= toBePatched) {
                // all new children have been patched so this can only be a removal
                unmount(prevChild, parentComponent, parentSuspense, true);
                continue;
            }
            let newIndex;
            if (prevChild.key != null) {
                newIndex = keyToNewIndexMap.get(prevChild.key);
            }
            else {
                // key-less node, try to locate a key-less node of the same type
                for (j = s2; j <= e2; j++) {
                    if (newIndexToOldIndexMap[j - s2] === 0 &&
                        isSameVNodeType(prevChild, c2[j])) {
                        newIndex = j;
                        break;
                    }
                }
            }
            if (newIndex === undefined) {
                unmount(prevChild, parentComponent, parentSuspense, true);
            }
            else {
                newIndexToOldIndexMap[newIndex - s2] = i + 1;
                if (newIndex >= maxNewIndexSoFar) {
                    maxNewIndexSoFar = newIndex;
                }
                else {
                    moved = true;
                }
                patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, optimized);
                patched++;
            }
        }
        // 5.3 move and mount
        // generate longest stable subsequence only when nodes have moved
        const increasingNewIndexSequence = moved
            ? getSequence(newIndexToOldIndexMap)
            : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        // looping backwards so that we can use last patched node as anchor
        for (i = toBePatched - 1; i >= 0; i--) {
            const nextIndex = s2 + i;
            const nextChild = c2[nextIndex];
            const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
            if (newIndexToOldIndexMap[i] === 0) {
                // mount new
                patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG);
            }
            else if (moved) {
                // move if:
                // There is no stable subsequence (e.g. a reverse)
                // OR current node is not among the stable sequence
                if (j < 0 || i !== increasingNewIndexSequence[j]) {
                    move(nextChild, container, anchor, 2 /* REORDER */);
                }
                else {
                    j--;
                }
            }
        }
    }
};
```

### vue 性能优化

路由懒加载

```js
const router = new Router({
  routes: [
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@/components/home.vue'),
  ]
})
```

keep-alive 缓存页面

```vue
<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
```

v-show 替代 v-if, v-show 可以服用dom

```vue
<template>
  <div>
    <div v-show="action">
      <Heavy power="on" />
    </div>
    <div v-show="!action">
      <Heavy power="off" />
    </div>
  </div>
</template>
```

避免v-for 和 v-if 写在同一dom上，上面有提到，因为vue解析的时候会先解析v-for，之后把所有的
节点中插入v-if，这样无形地增多了判断条件。建议用computed来提前处理数据，尽量减少这样的写法。


无需响应的数据使用 Object.freeze 冻结或者将数据的 configurable 置为 false


大列表使用虚拟滚动实现，只渲染一部分数据 [vue-virtual-scroll-list](https://www.npmjs.com/package/vue-virtual-scroll-list) 、 [vue-virtual-scroller](https://www.npmjs.com/package/vue-virtual-scroller)


自定义的*事件监听*、*定时器*在组件销毁时解绑，

```vue
mounted: (){
  this.timer = setInterval(()=> /* dosomething... */)
}
beforeDestroy(){
  clearInterval(this.timer)
}
```

图片懒加载

```html
<img v-lazy="/static/img/lazy.png" />
```

第三方库按需引入, babel-plugin-import 每个第三方的库都会有相应的引入说明


无状态组件标记为函数试

```vue
<template functional>
  <button
    class="btn btn-primary"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot/>
  </button>
</template>

// 或

Vue.component('my-functional-button', {
  functional: true,
  render: function (createElement, context) {
    // 完全透传任何 attribute、事件监听器、子节点等。
    return createElement('button', context.data, context.children)
  }
})
```


