/* 
    provider&project
    provide and inject enables dependency injection similar to the 2.x provide/inject options. 
    Both can only be called during setup() with a current active instance.
    依赖注入，和Vue2.x的provide、Inject类型类似。
    provide和inject都只能在setup函数中使用。
*/

/* -----------------provide&inject用法共享普通数据--------------- */
// 依靠依赖注入，我们可以跨组共享数据
// 你甚至可以在不依赖VueX的前提下，实现全局状态共享。熟悉React的同学知道，这和React的context类似。
/*  
    provide接受两个参数，
        第一个参数是provide唯一名称，最好用Symbol,避免重复。
        第二个参数是你要暴露的数据
*/

/* 
    inject accepts an optional default value as the 2nd argument. 
    If a default value is not provided and the property is not found on the provide context, 
    inject returns undefined.
    inject 接收两个参数
        第一个参数是provide名称，
        第二个参数是默认数据
    如果provider没有暴露自己的数据，那么使用inject默认数据。
*/

// 子级组件
// 按需导入 inject
const { inject } = Vue;
const Descendent = {
  setup() {
    // 调用 inject 函数时，通过指定的数据名称，获取到父级共享的数据
    const theme = inject(ThemeSymbol1, "light" /* optional default value */);
    console.log(theme); // dark
    // 如果父组件不传，就显示为light
    // 把接收到的共享数据 return 给 Template 使用
    return {
      theme,
    };
  },
};

// 祖先组件
const { provide, ref, watchEffect } = Vue;
const ThemeSymbol1 = Symbol();
const Ancestor = {
  components: { descendent: Descendent },
  template: `
      <div><descendent></descendent></div>
    `,
  setup() {
    // 通过 provide 函数向子级组件共享数据（不限层级）
    //    provide('要共享的数据名称', 被共享的数据)
    provide(ThemeSymbol1, "dark");
  },
};

/* -----------------Injection Reactivity共享ref相响应数据-------------------- */
/* 
    To retain reactivity between provided and injected values, a ref can be used:
    If a reactive object is injected, it can also be reactively observed.
*/
// in provider
const ThemeSymbol = Symbol();
// 定义 ref 响应式数据
const themeRef = ref("dark");
// 把 ref 数据通过 provide 提供的子组件使用
provide(ThemeSymbol, themeRef);

// in consumer
/* const theme = inject(ThemeSymbol, ref("light"));
watchEffect(() => {
  console.log(`theme set to: ${theme.value}`);
}); */

const ThemeSymbol2 = Symbol();
// 子级组件
// 按需导入 inject
const Descendent1 = {
  setup() {
    const theme = inject(ThemeSymbol2, ref("light"));
    watchEffect(() => {
      console.log(`theme set to: ${theme.value}`);
    });
    // 把接收到的共享数据 return 给 Template 使用
    return {
      theme,
    };
  },
};

// 祖先组件
const Ancestor1 = {
  components: { descendent: Descendent1 },
  template: `
      <div><descendent></descendent></div>
    `,
  setup() {
    // 定义 ref 响应式数据
    const themeRef = ref("dark");
    // 把 ref 数据通过 provide 提供的子组件使用
    provide(ThemeSymbol2, themeRef);
    setTimeout(() => {
      // 现在数据是响应式的了
      themeRef.value = "red";
    }, 1000);
  },
};

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
