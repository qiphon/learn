import { createApp } from 'vue';
import { Button, Pagination, List } from 'ant-design-vue';
import App from './App.vue';
import './index.css';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(Button);
app.use(store).use(router).mount('#app');
