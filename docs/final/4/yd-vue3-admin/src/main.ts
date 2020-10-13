import { createApp } from 'vue';
import { Button, Layout, Menu } from 'ant-design-vue';
import VueHighcharts from '@/directive/highcharts';
import App from './App.vue';
import './index.css';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import store from './store';

const antComps = [Button, Layout, Menu];

const app = createApp(App);
antComps.map((item) => app.use(item));
app.use(VueHighcharts);
app.use(store).use(router).mount('#app');
