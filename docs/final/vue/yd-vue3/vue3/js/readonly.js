/* 
    readonly
    Takes an object (reactive or plain) or a ref and returns a readonly (and reactive) proxy to the original.
    接收一个ref或者reactive包装对象，返回一个只读的响应式对象。
*/

const { readonly, reactive, watch, watchEffect } = Vue;

const App = {
  setup() {
    const original = reactive({ count: 0 });
    const copy = readonly(original);
    // [Vue warn]: `watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead.
    // `watch` now only supports `watch(source, cb, options?) signature.
    // watch 有更新，之前是，watch(fn,options),现在打包的这个vue3版本是最新的一版，有了一些更新，
    // watch的用法变成了，watch(source,cb,options?)
    // 另外增加了watchEffect(fn,options?)

    // watch(() => {
    // 这里换成watchEffect就没有警告了
    watchEffect(() => {
      // works for reactivity tracking
      console.log('值发生变化', copy.count); // 第一次是0，watchEffect会首先执行一次，这个执行时机是可以通过options进行配置的，后边改变后监听到数据变化，第二次打印1
    });
    // mutating original will trigger watchers relying on the copy
    //更改原始值将触发副本的更新
    original.count++;
    // mutating the copy will fail and result in a warning
    copy.count++; // 触发警告!  Set operation on key "count" failed: target is readonly.
  },
};
