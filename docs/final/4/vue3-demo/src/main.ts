import { createApp } from 'vue';
import './registerServiceWorker';
import { Button, Layout, Menu } from 'ant-design-vue';
import store from './store';
import router from './router';
import App from './App.vue';
import './index.css';

const app = createApp(App);
const AntComponents = [Button, Layout, Menu];
AntComponents.map((t) => app.use(t));
app
  .use(store)
  .use(router)
  .mount('#app');
