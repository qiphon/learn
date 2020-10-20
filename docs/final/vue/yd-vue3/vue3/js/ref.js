// ref
const { ref, reactive, isRef, toRefs } = Vue;
/*--------------1.用法-----------------*/
/* 
    Takes an inner value and returns a reactive and mutable ref object. 
    The ref object has a single property .value that points to the inner value.
    ref接收一个原始值，返回一个包装对象，包装对象具有.value属性。通过.value访问这个值。
    
    注解：
        被 ref 方法包裹后的 元素 就变成了一个代理对象。一般而言，这里的元素参数指 基本元素 或者称之为 inner value，
        如：number, string, boolean,null,undefied 等，object 一般不使用 ref，而是使用上文的 reactive。
        也就是说 ref 一般适用于某个元素的；而 reactive 适用于一个对象。
        ref 也就相当于把单个元素转换成一个 reactive 对象了，对象默认的键值名是：value。
*/
const App = {
  setup() {
    // 创建响应式数据对象 age，初始值为 3
    const count = ref(0);
    // 如果要访问 ref() 创建出来的响应式数据对象的值，必须通过 .value 属性才可以
    console.log(count.value); // 0
    count.value++;
    console.log(count.value); // 1
  },
};
// If an object is assigned as a ref's value, the object is made deeply reactive by the reactive method.

/*--------------2.Access in Templates----------------*/
// 在渲染上下文中访问ref
// 在渲染上下文中使用，Vue帮你自动展开，无须用.value访问。
const App2 = {
  template: `
        <div>{{ count }}</div>
    `,
  setup() {
    return {
      count: ref(0),
    };
  },
};
/*--------------3.Access in Reactive Objects----------------*/
// 在 reactive 对象中访问 ref 创建的响应式数据
// 当把 ref() 创建出来的响应式数据对象，挂载到 reactive() 上时，会自动把响应式数据对象展开为原始的值，
// 不需通过 .value 就可以直接被访问。
// 换句话说就是当一个包装对象被作为另一个响应式对象的属性引用的时候也会被自动展开
const App3 = {
  setup() {
    const count = ref(0);
    const state = reactive({
      count,
    });
    // 1.不用state.count.value
    console.log(state.count); // 0
    state.count = 1;
    // 作为值任然需要通过.value访问
    console.log(count.value); // 1

    // 2.if a new ref is assigned to a property linked to an existing ref, it will replace the old ref:
    // 新的 ref 会覆盖旧的 ref

    //再次创建 ref，命名为 otherCount
    const otherCount = ref(2);
    // 将 旧 refcount 替换为 新 ref otherCount
    state.count = otherCount;
    console.log(state.count); // 2 被覆盖
    console.log(count.value); // 1

    // 3.ref unwrapping only happens when nested inside a reactive Object. There is no unwrapping performed when the ref is accessed from an Array or a native collection type like Map:
    // 如果不是作为对象访问，则需要通过.value进行访问，例如array,map
    const arr = reactive([ref(0)]);
    // need .value here
    console.log(arr[0].value);
    const map = reactive(new Map([["foo", ref(0)]]));
    // need .value here
    console.log(map.get("foo").value);
  },
};

/*--------------4.Typing----------------*/
/* 
interface Ref<T> {
  value: T
}
function ref<T>(value: T): Ref<T>

const foo = ref<string | number>('foo') // foo's type: Ref<string | number>
foo.value = 123 // ok!

*/

/*--------------5.isRef----------------*/
/* 
    isRef
    Check whether a value is a ref object. Useful when unwrapping something that may be a ref.
    isRef() 用来判断某个值是否为 ref() 创建出来的对象；
    应用场景：当需要展开某个可能为 ref() 创建出来的值的时候
*/
// 用法
// const unwrapped = isRef(foo) ? foo.value : foo;

// typing
// function isRef(value: any): value is Ref<any>

/*--------------5.toRefs----------------*/
/* 
toRefs
转换成Ref
Convert a reactive object to a plain object, 
where each property on the resulting object is a ref pointing to the corresponding property in the original object.
函数可以将 reactive() 创建出来的响应式对象，转换为普通的对象，只不过，这个对象上的每个属性节点，
都是 ref() 类型的响应式数据，配合 v-model 指令能完成数据的双向绑定，在开发中非常高效。
*/
// 将一个 reactive 代理对象打平，转换为 ref 代理对象，使得对象的属性可以直接在 template 上使用。
const App4 = {
  template: `
    <div>
        <p>{{ obj.count }}</p>
        <p>{{ count }}</p>
        <p>{{ value }}</p>
    </div>
  `,
  setup() {
    const obj = reactive({
      count: 0,
      value: 100,
    });
    return {
      obj,
      // 如果这里的 obj 来自另一个文件，
      // 这里就可以不用包裹一层 key，可以将 obj 的元素直接平铺到这里
      // template 中可以直接获取属性
      ...toRefs(obj),
    };
  },
};

/*--------------6.总结----------------*/

/* 
    1.ref 和 reactive区别
    其实ref相当于reactive的小弟，ref背后也是通过reactive实现的，唯一的区别是ref返回的是包装对象
    const count = ref(0)  等价 const count = reactive({value:0})
*/

/* 
    2.为什么ref要返回一个包装对象？
    我们知道在 JavaScript 中，原始值类型如 string 和 number 是只有值，没有引用的。
    如果在一个函数中返回一个字符串变量，接收到这个字符串的代码只会获得一个值，是无法追踪原始变量后续的变化的。
    因此，包装对象的意义就在于提供一个让我们能够在函数之间以引用的方式传递任意类型值的容器。
    这有点像 React Hooks 中的 useRef —— 但不同的是 Vue 的包装对象同时还是响应式的数据源。
    有了这样的容器，我们就可以在封装了逻辑的组合函数中将状态以引用的方式传回给组件。
    组件负责展示（追踪依赖），组合函数负责管理状态（触发更新）：类似某act的自定义Hook
    setup() {
        const valueA = useLogicA() // valueA 可能被 useLogicA() 内部的代码修改从而触发更新
        const valueB = useLogicB()
        return {
            valueA,
            valueB
        }
    }
*/

/* 
    3.ref和reactive需要注意的点：
    在setup函数中，如果通过结构返回ref和reactive,那么在模板渲染上下文中，获取不到他们的响应式变化。
    因为解构他们就意味着copy了他们的引用。所以尽量不要用解构去返回一个你期望响应式的数据
*/
var App5 = {
  template: ` 
        <div class="container"> 
            <div>{{name1}}--{{name2}}</div> 
            <button @click="add1">add</button>      
            </div>
        `,
  setup() {
    const name1 = ref({ name1: "我是name" });
    const name2 = reactive({ name2: "aa" });
    const add1 = () => {
      console.log((name1.value.name1 = "test"));
      console.log((name2.name2 = "test"));
    };
    // 因为解构，数据不再是响应式的了
    /*     return {
      add1,
      ...name1.value,
      ...name2,
    }; */
    // 如果一定要使用解构，使用toRefs进行转换成响应式数据
    return {
      add1,
      ...toRefs({ name1: name1.value }),
      ...toRefs(name2),
    };
  },
};
