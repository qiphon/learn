/* 
    rective
    数据监听函数
    1.Takes an object and returns a reactive proxy of the original. This is equivalent to 2.x's Vue.observable().
      reactive函数接收一个对象作为参数，返回这个对象的响应式代理，等价Vue2.x的Vue.observable()
    2.The reactive conversion is "deep": it affects all nested properties. 
      In the ES2015 Proxy based implementation, the returned proxy is not equal to the original object. 
      It is recommended to work exclusively with the reactive proxy and avoid relying on the original object.
      对比Vue2.x的observable()，组件实例在初始化的时候会将 data 整个对象变为可观察对象，
      通过递归的方式给每个 Key 使用 Object.defineProperty 加上 getter 和 settter ，
      如果是数组就重写代理数组对象的七个方法。虽然给我们带来的便利，但是在大型项目上来说，性能开销就很大了。
      Vue3.0之后不再将主动监听所有的数据，而是将选择权给你，实例在初始化时不需要再去递归 data 对象了，
      从而降低了组件实例化的时间。
*/

const { reactive } = Vue;
const App = {
  template: `
    <div>{{reactiveData.name}}--{{reactiveData.address}}</div>
  `,
  setup() {
    // 需要注意的是加工后的对象跟原对象是不相等的，并且加工后的对象属于深度克隆的对象。
    let reactiveData = reactive({ name: "yideng", address: "beijing" });
    return {
      reactiveData,
    };
  },
};

// Type
/* 
    function reactive<T extends object>(raw: T): T 
*/
