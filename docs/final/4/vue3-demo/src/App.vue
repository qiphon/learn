<template>
  <a-layout id="components-layout-custom-trigger">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo">动态表单</div>
      <a-menu
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
      >
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

export default {
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  data() {
    return {
      selectedKeys: ['1'],
      collapsed: false,
    };
  },
};
</script>
<style lang="postcss" scoped>
#components-layout-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-custom-trigger .trigger:hover {
  color: var(--menu-active-color);
}

#components-layout-custom-trigger .logo {
  height: 32px;
  line-height: 32px;
  color: var(--white);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  background: var(--gray-opacity-2);
  margin: 16px;
}
</style>
