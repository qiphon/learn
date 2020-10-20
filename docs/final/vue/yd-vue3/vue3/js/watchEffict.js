/* 
    watchEffect
    Run a function immediately while reactively tracking its dependencies, and re-run it whenever the dependencies have changed.
    // watchEffect
*/
// 基本使用示例
const { ref, reactive, watchEffect, watch, onUpdated, onMounted } = Vue;
const App = {
  setup() {
    const count = ref(0);
    watchEffect(() => console.log(count.value));
    // -> logs 0

    setTimeout(() => {
      count.value++;
      // -> logs 1
    }, 100);
  },
};

/* ---------------Stopping the Watcher---------------- */
/* 
    When watchEffect is called during a component's setup() function or lifecycle hooks, 
    the watcher is linked to the component's lifecycle, and will be automatically stopped when the component is unmounted.
    In other cases, it returns a stop handle which can be called to explicitly stop the watcher:
    watch自动链接到组件的生命周期，在组件卸载的时候自动停止watch。不同的是，Vue3.0的watch函数返回一个停止watch的函数，供你手动停止watch
    
*/

const App2 = {
  setup() {
    // 创建监视，并得到 停止函数
    const stop = watchEffect(() => {
      /* ... */
    });
    // 调用停止函数，清除对应的监视
    stop();
  },
};

/* ------------------Side Effect Invalidation-------------------- */
/* 
    清理副作用
    Sometimes the watched effect function will perform async side effects that need to be cleaned up 
    when it is invalidated (i.e state changed before the effects can be completed). 
    The effect function receives an onInvalidate function that can be used to register a invalidation 
    callback. The invalidation callback is called when:
        the effect is about to re-run
        the watcher is stopped (i.e. when the component is unmounted if watchEffect is used inside setup() or lifecycle hooks)
        熟悉react 的useEffect的同学就知道，useEffect可以return 一个函数来清理自身的副作用，
        而Vue3.0是以参数的形式。
        一般情况下，在生命周期销毁阶段或是你手动stop这个监听函数的情况下，都会自动清理副作用，但是有时候，当观察的数据源变化后，我们可能需要执行一些异步操作，
        如setTimeOut,fetch，当这些异步操作完成之前，监测的数据源又发生变化的时候，我们可能要撤销还在等待的前一个操作，比如clearTimeOut。
        为了处理这种情况，watchEffect接收一个fn参数，可以注册一个回调函数来清除副作用 
*/
const App3 = {
  setup() {
    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        // id has changed or watcher is stopped.
        // invalidate previously pending async operation
        /* 清除副作用 */
      });
    });
  },
};

/* 
    注意点：
    We are registering the invalidation callback via a passed-in function instead of 
    returning it from the callback (like React useEffect) because the return value is important for async error handling. 
    It is very common for the effect function to be an async function when performing data fetching:
    那么为什么Vue不像React那样，return一个清理副作用的函数，而是通过参数呢？
    这是因为，我们可能这么写watch:
    An async function implicitly returns a Promise, but the cleanup function needs to be 
    registered immediately before the Promise resolves. In addition, 
    Vue relies on the returned Promise to automatically handle potential errors in the Promise chain
    async函数隐性地返回一个promise，这样的情况下，我们是无法返回一个需要被立刻注册的清理函数的
*/

const App3_1 = {
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
};

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

/* 
    Note the first run is executed before the component is mounted. 
    So if you wish to access the DOM (or template refs) in a watched effect, 
    do it in the mounted hook:
    如果你想拿到dom，或者template上的refs,可以放在mounted hook
*/
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

/* 
    回调时机
        默认情况下，所有的 watch 回调都会在当前的 renderer flush 之后被调用。这确保了在回调中 DOM 永远都已经被更新完毕。
        如果你想要让回调在 DOM 更新之前或是被同步触发，可以使用 flush 选项：
    In cases where a watcher effect needs to be re-run synchronously or before component updates, 
    we can pass an additional options object with the flush option (default is 'post'):
    控制watch回调调用时机
        默认情况下，watchEffect会在组件更新之后调用，如果你想在组件更新前调用，你可以传第三个参数，
        第三个参数是个对象，有几个选项
            flush  表示回调调用时机
                post 默认值，在组件更新之后
                pre 组件更新之前
                sync 同步调用
            
*/

// flush fire synchronous

const App5_1 = {
  setup() {
    watchEffect(
      () => {
        console.log("会被同步调用");
      },
      {
        flush: "sync",
      }
    );
  },
};

// flush fire before component updates
const App5_2 = {
  template: `
    <div>{{count}}<button @click="handleClick">点击</button></div>
`,
  setup() {
    const count = ref(0);
    function handleClick() {
      count.value++;
    }
    onMounted(() => {
      console.log("onMounted");
    });
    watchEffect(
      () => {
        console.log("onMounted前调用", count.value);
      },
      {
        // vue.global.js 8712行注解
        // with 'pre' option, the first call must happen before the component is mounted so it is called synchronously.
        /* 
            else if (flush === 'pre') {
          scheduler = job => {
              if (!instance || instance.isMounted) {
                  queueJob(job);
              }
              else {
                  // with 'pre' option, the first call must happen before
                  // the component is mounted so it is called synchronously.
                  job();
              }
          };
      }
        */
        flush: "pre",
      }
    );
    return {
      count,
      handleClick,
    };
  },
};

/* ------------------Watcher Debugging-------------------- */
/* 
    The onTrack and onTrigger options can be used to debug a watcher's behavior.
        onTrack will be called when a reactive property or ref is tracked as a dependency
        onTrigger will be called when the watcher callback is triggered by the mutation of a dependency
    Both callbacks will receive a debugger event which contains information on the dependency in question. 
    It is recommended to place a debugger statement in these callbacks to interactively inspect the dependency:
    debugger钩子函数，分别在依赖追踪和依赖发生变化时调用。
*/
const App6 = {
  setup() {
    const num = ref(0);
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
    setTimeout(() => {
      // 示意触发onTrigger
      num.value++;
    }, 1000);
  },
};

// onTrack and onTrigger only works in development mode.
//  仅在开发环境有效

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
