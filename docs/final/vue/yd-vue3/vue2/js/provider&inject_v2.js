/* 
provider&inject 2.2.0 新增
    1.这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，
      并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。
    2.provide 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性。
      在该对象中你可以使用 ES2015 Symbols 作为 key，但是只在原生支持 Symbol 和 Reflect.ownKeys 的环境下可工作。
    3.inject 选项应该是：
        一个字符串数组，或
        一个对象，对象的 key 是本地的绑定名，value 是：
            在可用的注入内容中搜索用的 key (字符串或 Symbol)，或
            一个对象，该对象的
                from 属性是在可用的注入内容中搜索用的 key (字符串或 Symbol)
                default 属性是降级情况下使用的 value
*/
/* ----------------基本示例------------------ */
// 子组件注入 'foo'
const childComp = Vue.component("child-comp", {
  template: `
    <div>子组件</div>
  `,
  inject: ["foo"],
  created() {
    console.log(this.foo); // => "bar"
  },
});

// 父级组件提供 'foo'
const Parent = new Vue({
  components: { "child-comp": childComp },
  el: "#app",
  template: `
    <div>父组件<child-comp></child-comp></div>
  `,
  provide: {
    foo: "bar",
  },
});

/* --------------利用 ES2015 Symbols、函数 provide 和对象 inject：----------------- */
const s = Symbol();

const Provider = {
  provide() {
    return {
      [s]: "foo",
    };
  },
};

const Child = {
  inject: { s },
  // ...
};

/* -----------在 2.5.0+ 的注入可以通过设置默认值使其变成可选项：---------- */
const Child1 = {
  inject: {
    foo: { default: "foo" },
  },
};

// from 如果它需要从一个不同名字的属性注入，则使用 from 来表示其源属性：
const Child2 = {
  inject: {
    foo: {
      from: "bar",
      default: "foo",
    },
  },
};
// 与 prop 的默认值类似，你需要对非原始值使用一个工厂方法：
const Child3 = {
  inject: {
    foo: {
      from: "bar",
      default: () => [1, 2, 3],
    },
  },
};
