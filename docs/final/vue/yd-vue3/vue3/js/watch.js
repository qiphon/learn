/* 
    watch
    The watch API is the exact equivalent of the 2.x this.$watch (and the corresponding watch option). 
    watch requires watching a specific data source, 
    and applies side effects in a separate callback function. 
    It also is lazy by default - i.e. the callback is only called when the watched source has changed.
    // 它默认是lazy,只有当监听的值发生变化的时候，才会触发回调函数
    watch() API 提供了基于观察状态的变化来执行副作用的能力。
    watch(source,cb,options?)
    watch() 接收三个参数
        1.第一个参数被称作 “数据源”，它可以是：
            一个返回任意值的函数
            一个包装对象
            一个包含上述两种数据源的数组
            source：可以是getter函数，值包装器或包含上述两种类型的数组（如果要查看多个源）
        2.第二个参数是回调函数。回调函数只有当数据源发生变动时才会被触发：
            callback：是类似于Vue2 watcher处理程序的函数，带有2个参数：newVal，oldVal。
            每个参数都可以是一个数组(用于观察多个源): [newVal1，newVal2，... newValN]，[oldVal1，oldVal2，... oldValN]
        3.第三个可选参数options,
            deep 深度监听
                类型: boolean  default :false
                和Vue2.x行为一致，都是对对象的深度监听
            Lazy - 和Vue2.x immediate 正好相反
                类型:Boolean, default:false
    Compared to watchEffect, watch allows us to:
        Perform the side effect lazily;
        Be more specific about what state should trigger the watcher to re-run;
        Access both the previous and current value of the watched state.
*/

/* 
    Watching a Single Source
    A watcher data source can either be a getter function that returns a value, or directly a ref:
    监视指定的数据源
*/
const { reactive, watch, ref, watchEffect } = Vue;
const App = {
  setup() {
    // 监视 reactive 类型的数据源：
    const state = reactive({ count: 0 });
    // 定义 watch，只要 count 值变化，就会触发 watch 回调
    // watch 会在创建时会自动调用一次
    watch(
      () => state.count,
      (count, prevCount) => {
        //  默认是lazy,所以一开始不会触发回调
        console.log("第一个监听", count, prevCount);
      }
    );
    setTimeout(() => {
      state.count++;
      // 现在就会触发回调
    }, 1000);

    // 监视 ref 类型的数据源：
    // 定义数据源
    const count = ref(0);
    // 指定要监视的数据源
    watch(count, (count, prevCount) => {
      console.log("第二个监听", count, prevCount);
    });
    setTimeout(() => {
      count.value++;
      // 现在就会触发回调
    }, 1000);
  },
};

// deep  watch和watchEffect的options可选参数，配置项相同
const App_1 = {
  template: `
      <div><button @click="add1">点击</button></div>
  `,
  setup() {
    const count1 = reactive({ count: { count: 0 } });
    watch(
      () => count1.count,
      (val, oldVal) => {
        console.log(count1, "count1");
      },
      { deep: true }
    );
    const add1 = () => {
      count1.count.count = Math.random();
    };
    return {
      add1,
    };
  },
};

/* 
    Watching Multiple Sources
    监视多个数据源
    A watcher can also watch multiple sources at the same time using an Array:
    这种情况下，任意一个数据源的变化都会触发回调，同时回调会接收到包含对应值的数组作为参数：
*/
const App1 = {
  setup() {
    const count = ref(0);
    const test = ref(0);
    const state = reactive({ name: "京程一灯", address: "北京" });
    watch(
      [() => state.name, () => state.address], // Object.values(toRefs(state));
      ([name, address], [prevName, prevAddress]) => {
        console.log(name); // 新的 name 值
        console.log(address); // 新的 address 值
        console.log("------------");
        console.log(prevName); // 旧的 name 值
        console.log(prevAddress); // 旧的 address 值
      },
      {
        // 默认就是lazy,在 watch 被创建的时候，不执行回调函数中的代码
        // 比如这里设置watch的可选参数options选项，immediate,则在创建的时候会立即执行
        //源码中： function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
        immediate: true,
      }
    );
    setTimeout(() => {
      // 任意一个数据源的变化都会触发回调
      state.name = "yideng";
    }, 1000);
  },
};
/* 
    可以将多个源观察程序拆分为较小的观察程序。这有助于我们组织代码并创建具有不同选项的观察程序：
*/

const App1_1 = {
  setup() {
    const value = ref(0);
    const count = ref(0);
    const test = ref(0);
    // 拆分成两个
    watch([value, count], ([newValue, newCount], [oldValue, oldCount]) => {
      console.log(value.value, "第一个watch");
    });
    watch(
      () => test.value,
      (newTest, oldTest) => {
        console.log(value.value, "第二个watch");
      }
    );
    setTimeout(() => {
      value.value++;
      test.value++;
    }, 1000);
  },
};

/* 
    Shared Behavior with watchEffect
    watch shares behavior with watchEffect in terms of manual stoppage, 
    side effect invalidation (with onInvalidate passed to the callback as the 3rd argument instead), 
    flush timing and debugging.
    原先是watch的第三个参数来进行副作用的清除，现在使用watchEffect第一个参数，fn,来进行
    // watch(source,cb,options?)
    // watchEffect(fn,options?)
    
*/
const App2 = {
  setup() {
    watchEffect((onInvalidate) => {
      //   const token = performAsyncOperation(id.value);
      onInvalidate(() => {
        // id has changed or watcher is stopped.
        // invalidate previously pending async operation
        // 副作用的清除
        // token.cancel();
        console.log("清除副作用等");
      });
    });
  },
};

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
