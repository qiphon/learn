/* 
    Lifecycle Hooks
    Lifecycle hooks can be registered with directly imported onXXX functions:
    These lifecycle hook registration functions can only be used synchronously during setup(), 
    since they rely on internal global state to locate 
    the current active instance (the component instance whose setup() is being called right now). 
    Calling them without a current active instance will result in an error.
    The component instance context is also set during the synchronous execution of lifecycle hooks, 
    so watchers and computed properties created inside synchronously inside lifecycle hooks 
    are also automatically tore down when the component unmounts.
    所有现有的生命周期钩子都会有对应的 onXXX 函数（只能在 setup() 中使用），去除created、beforeCreate。
*/
const {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
} = Vue;
const App = {
  setup() {
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    onMounted(() => {
      console.log("onMounted!");
    });
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate!");
    });
    onUpdated(() => {
      console.log("onUpdated!");
    });
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount!");
    });
    onUnmounted(() => {
      console.log("onUnmounted!");
    });
    onErrorCaptured(() => {
      console.log("onErrorCaptured!");
    });
  },
};

/* ----------------总结----------------- */
/*  
Mapping between 2.x Lifecycle Options and Composition API
2.x与 3.x对比
    beforeCreate -> use setup()
    created -> use setup()
    beforeMount -> onBeforeMount
    mounted -> onMounted
    beforeUpdate -> onBeforeUpdate
    updated -> onUpdated
    beforeDestroy -> onBeforeUnmount
    destroyed -> onUnmounted
    errorCaptured -> onErrorCaptured
*/

/* ----------------new hooks----------------- */
/* 
    In addition to 2.x lifecycle equivalents, the Composition API also provides the following debug hooks:
        onRenderTracked
        onRenderTriggered
    Both hooks receive a DebuggerEvent similar to the onTrack and onTrigger options for watchers:
  */
const App1 = {
  onRenderTriggered(e) {
    debugger;
    // inspect which dependency is causing the component to re-render
  },
  onRenderTracked() {
    debugger;
  },
  setup() {},
};
