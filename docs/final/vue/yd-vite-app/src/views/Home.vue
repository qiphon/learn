<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <hr />
    <Test />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '/@/components/HelloWorld.vue';
import Test from '/@/components/Test.vue';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
    Test,
  },
});
</script>
