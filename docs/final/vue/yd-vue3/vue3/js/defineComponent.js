/* 
    defineComponent
        This function is provided solely for type inference. It is needed in order for TypeScript 
        to know that an object should be treated as a component definition so that it can infer 
        the types of the props passed to setup(). It is a no-op behavior-wise. 
        It expects a component definition and returns the argument as-is.
        这个函数不是必须的，除非你想要完美结合 TypeScript 提供的类型推断来进行项目的开发。

        这个函数仅仅提供了类型推断，方便在结合 TypeScript 书写代码时，能为 setup() 中的 props 提供完整的类型推断。
*/
const { defineComponent } = Vue;
const defineComponent = {
  props: {
    name: String,
  },
  setup(props) {
    console.log(props.name);
  },
};

/* 
    Alternatively if your component does not use any option other than setup itself, 
    you can pass the function directly:
*/
/* 
    const defineComponent2 = (props: { name: string }) => {
        console.log(props.name);
    }; 
*/
