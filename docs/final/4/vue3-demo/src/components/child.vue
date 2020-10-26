<template>
<div>
  <h1>child</h1>
  <div @click="changeNum(num)">
    {{ num }}
  </div>
</div>
</template>

<script>
import {
  inject,
  defineComponent,
  setup,
} from 'vue';

const Child = defineComponent({
  setup() {
    let num = inject('num2');

    return {
      num,
    };
  },
  methods: {
    changeNum(num) {
      this.num = 444;
      console.log(num, this.num);
      // num = 333;
    },
  },
});

export default Child;
</script>
