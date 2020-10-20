// setup
/* 
  英文
  setup是一个新的组件选项，也是其他API的入口。
  1.Invocation Timing
  2.Usage with Templates
  3.Usage with Render Functions / JSX
  4.Arguments
  5.Usage of this
  6.Typing
*/

/* 
    注解：
    1.setup是一个新的组件选项，也是其他API的入口。
      也就是说，你所有的操作都将在setup函数内部定义和执行，
      Vue3.0也将用函数代替Vue2.x的类也就是new Vue()
    2.setup 第一个参数是props,这里的props和Vue2.x中的props一致。
    3.何时调用？setup是在一个组件实例被创建时，初始化了 props 之后调用，
      其实就是取代了Vue2.x的careted和beforeCreate。
    4.setup返回一个对象，对象中的属性将直接暴露给模板渲染的上下文。
      而在Vue2.x中，你定义的属性都会被Vue内部无条件暴露给模板渲染上下文。
  */
const { ref, reactive, watchEffect, h } = Vue;

/* ---------------Usage with Templates----------------- */
// template渲染
const App1 = {
  template: `
      <div>
        <div>{{ count }} {{ object.foo }}</div>
      </div>
    `,
  // setup是在一个组件实例被创建时，初始化了 props 之后调用
  //  相当于vue2的beforeCreate,created
  setup() {
    const count = ref(0);
    const object = reactive({ foo: "bar" });
    // expose to template
    // setup返回一个对象，对象中的属性将直接暴露给模板渲染的上下文。
    return {
      count,
      object,
    };
  },
};

/* ---------------Usage with Render Functions / JSX----------------- */
// setup can also return a render function, which can directly make use of reactive state declared in the same scope:
const App2 = {
  setup() {
    const count = ref(0);
    const object = reactive({ foo: "bar" });
    // render函数渲染
    return () => h("div", [count.value, object.foo]);
  },
};

/* ---------------第一个 Arguments Props----------------- */
// The function receives the resolved props as its first argument:
const App3_1 = {
  props: {
    name: {},
  },
  setup(props) {
    console.log(props.name); // 因为没有传值所以是undefined
  },
};
// 现在在App3_1_parent中进行调用，就有值了
const App3_1_parent = {
  // 组件注册
  components: { "app-31": App3_1 },
  template: `
    <div><app-31 name="app-31传递的值"></app-31></div>
  `,
};

// Note this props object is reactive - i.e. it is updated when new props are passed in, and can be observed and reacted upon using watchEffect or watch:
/* 
  除此之外，还可以直接通过 watch 方法来观察某个 prop 的变动，这是为什么呢？
  props本身在源码中，也是一个被 reactive 包裹后的对象，因此它具有响应性，所以在watch 方法中的回调函数会自动收集依赖，
  当name变动后，会自动调用这些回调逻辑。
*/
const App3_2 = {
  // 类型定义的时候，仍然可以像Vue2.x一样
  props: {
    name: String,
  },
  setup(props) {
    watchEffect(() => {
      // 可以通过watchEffect进行监听
      console.log(`name is: ` + props.name); // name is: app-32传递的值
    });
  },
};
const App3_2_parent = {
  components: { "app-32": App3_2 },
  template: `
    <div><app-32 name="app-32传递的值"></app-32></div>
  `,
};

// However, do NOT destructure the props object, as it will lose reactivity:
// The props object is immutable for userland code during development (will emit warning if user code attempts to mutate it).
// props 对象是响应式的 —— 它可以被当作数据源去观测，当后续 props 发生变动时它也会被框架内部同步更新。
// 但对于用户代码来说，它是不可修改的（会导致警告）
const App3_3 = {
  props: {
    name: String,
  },
  setup(props) {
    watchEffect(() => {
      console.log(`name is: ` + name); // Will not be reactive! 需要通过props进行访问
    });
    // 如果修改
    // 触发警告：Set operation on key "name" failed: target is readonly. {name: "app-33传递的值"}
    props.name = "修改props";
  },
};
const App3_3_parent = {
  components: { "app-33": App3_3 },
  template: `
    <div><app-33 name="app-33传递的值"></app-33></div>
  `,
};
/* 
  1.props对比Vue2.x主要要注意的地方
  (1)Vue2.x中props绑定在this上，我们可以通过this.props.propsName获取对应的值，
    Vue3.0后Props将变成setup的第一个参数,而setup也是在初始化props之后才被调用。有点像某act的感觉
  (2)类型定义的时候，仍然可以像Vue2.x一样，同时也支持TS
  (3)props 对象是响应式的 —— 它可以被当作数据源去观测，当后续 props 发生变动时它也会被框架内部同步更新。
    但对于用户代码来说，它是不可修改的（会导致警告）
    
    interface IProps{
        name:string
    }
    const MyComponent = {
    
      setup(props:IProps) {
        return {
          msg: `hello ${props.name}!`
        }
      },
      template: `<div>{{ msg }}</div>`
    }

*/

/* ---------------第二个 Arguments----------------- */
// The second argument provides a context object which exposes a selective list of properties that were previously exposed on this in 2.x APIs:
// setup第二个参数提供一个上下文对象，这个上下文对象提供一个可选的属性列表，和Vue2.x中挂载在this上的属性列表一致。
// context具有与this.$attrs，this.$slots，this.$emit，this.$parent，this.$root对应的属性（属性，插槽，emit，parent，root）。
const App4 = {
  setup(props, context) {
    // Vue2.0 中是通过 this 才能访问到
    // setup是不能使用this的，是通过context上下文进行访问的
    console.log(context.attrs);
    console.log(context.slots);
    console.log(context.emit);
  },
  // 或者使用解构获取值
  /*   setup(props, { attrs, slots, emit }) {
    console.log('解构',attrs, slots, emit);
  }, */
};

/* ---------------Usage of this----------------- */
/* 
this is not available inside setup(),Since setup() is called before 2.x options are resolved,
this inside setup() (if made available) will behave quite differently from this in other 2.x options. 
Making it available will likely cause confusions when using setup() along other 2.x options. 
Another reason for avoiding this in setup() is a very common pitfall for beginners:
*/
const App5 = {
  template: `
      <div>
        <div>{{ count }}</div>
        <button @click="handleClick">点击</button>
      </div>
    `,
  setup() {
    const count = ref(0);
    //  this关键字在setup()函数中不可用。
    console.log(this); // this -> window
    console.log(this.count); //// undefined
    function handleClick() {
      console.log(this); // this -> window
      console.log(this.count); // undefined
    }
    return {
      count,
      handleClick,
    };
  },
};

/* ---------------Typing----------------- */
/* 
interface Data {
  [key: string]: unknown
}

interface SetupContext {
  attrs: Data
  slots: Slots
  emit: ((event: string, ...args: unknown[]) => void)
}
function setup(
  props: Data,
  context: SetupContext
): Data 
*/
