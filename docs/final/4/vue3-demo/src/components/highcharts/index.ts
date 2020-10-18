import { Plugin, App } from 'vue';
import vueHighcharts from './heightCharts';

const install = (app: App) => {
  app.component(vueHighcharts.name, vueHighcharts);
};

vueHighcharts.install = install;

export default (vueHighcharts as unknown) as Plugin;
