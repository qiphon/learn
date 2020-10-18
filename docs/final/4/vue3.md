# vue3 表单项目配置说明

### [vite](https://github.com/vitejs/vite)

目前问题比较多

### vue-cli + antd-vue + Vue3 + Vuex + ts + eslint（Airbnb） + unit + e2e

- antd-vue

    配置按需引入

    ```js
    // babel 配置
    "plugins": [
        ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
    ]

    // 组件引入
    import { Button } from 'ant-design-vue';
    import store from './store';
    import router from './router';
    import App from './App.vue';

    const app = createApp(App);
    const AntComponents = [Button];
    AntComponents.map((t) => app.use(t));
    ```

- 配置修改

    vue.config.js

    ```js
    module.exports = {
        devServer: {
            port: 9991   
        }
    }
    ```

- postcss 

    postcss.config.js

    ```js
    module.exports = {
        plugins: {
            'postcss-preset-env': {
                stage:0,
                features: {
                    'nesting-rules': true
                }
            }
        }
    }
    ```

- highCharts

    自定义组件的类型定义

    ```ts
    // shims-vue.d.ts
    import { Plugin } from 'vue'
    declare module 'vue-highcharts' {
        const Highcharts: Plugin;
        export default Highcharts;
    }
    ```

