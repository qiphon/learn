/* 
import { computed } from 'vue';
    computed
    计算值的行为跟计算属性 (computed property) 一样：只有当依赖变化的时候它才会被重新计算。类型某act的useCallback useMemo 
    computed() 返回的是一个包装对象，它可以和普通的包装对象一样在 setup() 中被返回 ，也一样会在渲染上下文中被自动展开。
*/
const { computed, reactive, ref } = Vue;

/* ---------------用法-------------- */
/* 
用法一：
Takes a getter function and returns an immutable reactive ref object for the returned value from the getter.
直接传一个函数,返回你所依赖的值的计算结果，这个值是个包装对象，默认情况下，如果用户试图去修改一个只读包装对象，会触发警告，
说白了就是你只能get无法set
*/

const App = {
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
};

/* 
    用法二：
    Alternatively, it can take an object with get and set functions to create a writable ref object.
    在调用 computed() 函数期间，传入一个包含 get 和 set 函数的对象，可以得到一个可读可写的计算属性，示例代码如下：
*/
const App1 = {
  setup() {
    // 创建一个 ref 响应式数据
    const count = ref(1);
    // 创建一个 computed 计算属性
    const plusOne = computed({
      // 取值函数
      get: () => count.value + 1,
      // 赋值函数
      set: (val) => {
        count.value = val - 1;
      },
    });
    // 为计算属性赋值的操作，会触发 set 函数
    plusOne.value = 1;
    // 触发 set 函数后，count 的值会被更新
    console.log(count.value); // 0
  },
};

/* 
    总结：vue2.x与vue3.x的computed
    总的来说这两点和Vue2.x相同。
    唯一不同的是，3.0中，computed 被抽成一个API，直接从vue中获取，
    而Vue2.x中，computed是一个对象，在对象中定义一个个computed
*/

/* ---------------typing-------------- */

/* 
    // read-only
    function computed<T>(getter: () => T): Readonly<Ref<Readonly<T>>>

    // writable
    function computed<T>(options: {
    get: () => T,
    set: (value: T) => void
    }): Ref<T> 
*/
