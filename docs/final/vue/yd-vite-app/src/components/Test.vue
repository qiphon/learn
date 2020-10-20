<template>
  <div class="hello">
    <h1 @click="increment">原生dom☔️ {{ count }}</h1>
    <hr />
    <h2>{{ x }}</h2>
    <input type="button" value="...." ref="rootButton" />
  </div>
</template>

<script lang="ts">
// import { Component, Prop, Vue } from 'vue-property-decorator';
// @Component
// export default class HelloWorld extends Vue {
//   @Prop() private msg!: string;
// }
import { defineComponent, Ref, ref } from 'vue';
import { useMousePosition, getDivDom } from '/@/hooks';

export default defineComponent({
  setup() {
    const { x, y } = useMousePosition();
    const count: Ref<number> = ref(0);
    const rootButton = ref(null);
    //处理实际类型的dom
    getDivDom(rootButton);
    // divDom.value = "额外属性";
    // console.log("👨‍💻‍dom", divDom);
    console.log('🐻', x);
    console.log('🐈', y);
    const increment = () => {
      // count.value++;
      x.value += 2;
      count.value += 1;
    };
    console.log('组件构建', count);
    return {
      count,
      x,
      increment,
      rootButton,
    };
  },
});
</script>

<style lang="postcss" scoped>
h3 {
  margin: 40px 0 0;
}
.hello {
  & h1 {
    cursor: pointer;
  }
}
</style>
