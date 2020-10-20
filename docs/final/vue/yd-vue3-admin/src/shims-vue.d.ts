declare module '*.vue' {
  import { FunctionalComponent, defineComponent, Plugin } from 'vue';

  const component: ReturnType<typeof defineComponent> | FunctionalComponent;
  export default component;
}

declare module 'vue-highcharts' {
  const highcharts: Plugin;
  export default highcharts;
}
