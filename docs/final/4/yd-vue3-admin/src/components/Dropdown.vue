<template>
  <div ref="dropdownRef">
    <a href="#" class="btn" @click.prevent="toggleOpen">
      <!-- {{ title }} -->
      测试Button
    </a>
    <ul :style="{ display: 'block' }" v-if="isOpen">
      下拉菜单
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import useClickOutside from '@/hooks/useClickOutside';

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      //   required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const isClickOutside = useClickOutside(dropdownRef);

    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false;
      }
    });
    return {
      isOpen,
      toggleOpen,
      dropdownRef,
    };
  },
});
</script>
