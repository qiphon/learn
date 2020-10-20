<template>
  <div class="side-nav">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
    >
      <a-menu-item key="0">
        <router-link to="/layout"> <user-outlined />首页 </router-link>
      </a-menu-item>
      <a-sub-menu key="wx-min">
        <template #title>
          <span>小程序端</span>
        </template>
        <a-menu-item-group key="g1">
          <a-menu-item key="1">
            <router-link to="/layout/banner">Banner管理</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/total">面试题库</router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/daily">每日一题</router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <router-link to="/video">视频管理</router-link>
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu key="daily-opration">
        <template #title>
          <span>日常运营</span>
        </template>
        <a-menu-item-group key="g2">
          <a-menu-item key="5">日常运营管理</a-menu-item>
          <a-menu-item key="6">Option 2</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu key="student-info">
        <template #title>
          <span>学员档案</span>
        </template>
        <a-menu-item-group key="g3">
          <a-menu-item key="7">Option 1</a-menu-item>
          <a-menu-item key="8">Option 2</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watch } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
// const { UserOutlined } = iconsvue;
// console.log('测试', iconsvue);
export default {
  name: 'SiderNav',
  components: {
    UserOutlined,
    // VideoCameraOutlined,
    // UploadOutlined,
    // MenuUnfoldOutlined,
    // MenuFoldOutlined,
  },
  setup() {
    const antMenyOpt = reactive({
      selectedKeys: ['0'],
      openKeys: [''],
    });
    watch(
      () => antMenyOpt.selectedKeys,
      (val) => {
        console.log('1', val);
      },
    );
    return {
      ...toRefs(antMenyOpt),
    };
  },
};
</script>

<style lang="postcss" scoped></style>
