<template>
  <a-layout id="components-layout">
    <a-layout-sider>
      <div class="logo" />
      <sider-nav />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <h1>京程一灯运营监控中心 CRM</h1>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '16px 8px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SiderNav from '@/components/SiderNav.vue';

export default defineComponent({
  name: 'Home',
  components: {
    SiderNav,
  },
});
</script>

<style lang="postcss" scoped>
h1 {
  /* padding-top: 5px !important;
  margin-left: 24px !important; */
  font: bold 30px "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: rgba(26, 144, 255.8);
  text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbbbbb,
    0 4px 0 #b9b9b9, 0 5px 0 #aaaaaa, 0 6px 1px rgba(0, 0, 0, 0.1),
    0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3),
    0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15);
  transition: 0.2s all linear;
  transform: translate(24px, 5px);
}
#components-layout {
  height: 100%;
  & .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  & .logo {
    height: 58px;
    background: url(../assets/logo.png) 0% 0% / 100% no-repeat;
    margin: 16px;
  }
}
</style>
