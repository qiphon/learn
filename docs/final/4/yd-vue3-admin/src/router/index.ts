import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/views/Layout.vue';
import IndexPanel from '@/components/IndexPanel.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'IndexPanel',
        component: IndexPanel,
      },
      {
        path: 'banner',
        name: 'bannerPanel',
        component: () => import(/* webpackChunkName: "dropdown" */ '@/components/Dropdown.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
