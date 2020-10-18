declare module '*.vue' {
  import type { DefineComponent, Plugin } from 'vue';

  const component: DefineComponent;
  export default component;
}

declare module 'vue-highcharts' {
  const Highcharts: Plugin;
  export default Highcharts;
}
