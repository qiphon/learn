/* 
    通过 ref() 还可以引用页面上的元素或组件。
    Template Refs
    When using the Composition API, the concept of reactive refs and template refs are unified. 
    In order to obtain a reference to an in-template element or component instance, 
    we can declare a ref as usual and return it from setup():
*/
const { ref, onMounted, h, reactive, onBeforeUpdate } = Vue;
const App = {
  template: `
    <div ref="root">ref使用示例</div>
 `,
  setup() {
    // 创建一个 DOM 引用
    const root = ref(null);
    // 在 DOM 首次加载完毕之后，才能获取到元素的引用
    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      //   root.value 是原生DOM对象
      console.log(root.value); 
    });
    // 把创建的引用 return 出去
    return {
      root,
    };
  },
};
// 组件中也是同样的使用方式

/* --------------Usage with Render Function / JSX------------------ */
const App1 = {
  template: `
    <div ref="root">ref使用示例</div>
 `,
  setup() {
    const root = ref(null);
    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(root.value); // <div/>
    });
    // function
    return () =>
      h("div", {
        ref: root,
      });

    // with JSX
    // return () => <div ref={root} />;
  },
};

/* --------------Usage inside v-for------------------ */
/* 
    Composition API template refs do not have special handling when used inside v-for. 
    Instead, use function refs (new feature in 3.0) to perform custom handling:
*/
const App2 = {
  template: `
    <div
        v-for="(item, i) in list"
        :ref="el => { divs[i] = el }">
        {{ item }}
    </div>
 `,
  setup() {
    const list = reactive([1, 2, 3]);
    const divs = ref([]);
    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(divs.value[0]); // <div>1</div>
    });
    // make sure to reset the refs before each update
    onBeforeUpdate(() => {
      divs.value = [];
    });
    return {
      list,
      divs,
    };
  },
};
