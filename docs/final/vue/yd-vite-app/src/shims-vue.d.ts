declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
//无法识别的模块简单hack
declare module '*.json';
declare module '*.jepg';
