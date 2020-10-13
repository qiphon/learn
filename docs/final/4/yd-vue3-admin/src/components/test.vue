<template>
  <div class="test">test content</div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'Test',
  setup() {
    onMounted(() => {
      console.log('test mounted');
    });
  },
});
</script>
