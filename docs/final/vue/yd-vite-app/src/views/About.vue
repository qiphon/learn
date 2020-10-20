<template>
  <div class="about">
    <a-button type="primary" @click="handleClick"> 测试按钮 </a-button>
    <h1>异步组件+Ant测试</h1>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    handleClick(e) {
      console.log('click', e);
    },
  },
};
</script>
