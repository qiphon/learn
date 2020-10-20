// 基础示例,vue3的简单例子
/* 
    Vue引入了Composition API（基于功能的API）作为当前基于Option的API的补充。
    该API将随Vue 3一起发布
*/
/* 
    基于选项的API与组合API
    当前基于选项的API概念与新的合成API（基于函数的API）概念的区别在于：
        基于选项的API：组件包含属性/方法/选项的类型。
        组合API：组件将逻辑封装到函数中。
*/
const { reactive, computed } = Vue;
const App = {
  template: `
        <div>Count is: {{ state.count }}, double is: {{ state.double }}</div>
        <button @click="increment">Add</button>
    `,
  setup() {
    // 创建响应数据
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
    });
    
    function increment() {
      state.count++;
    }
    
    return {
      state,
      increment,
    };
  },
};
