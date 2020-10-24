<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      {{ ab }}
      <br />
      check out the {{ n }}
      <br />
      {{ num }}
      <br />
      {{ num2 }} ===== num2
      <br />
    </p>
    <h3>Installed CLI Plugins</h3>
  </div>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component';

// @Options({
//   props: {
//     msg: String,
//   },
// })
// export default class HelloWorld extends Vue {
//   msg!: string
// }
import {
  defineComponent,
  watchEffect,
  reactive,
  ref,
  Ref,
  toRefs,
  computed,
  readonly,
} from 'vue';

const HelloWorld = defineComponent({
  setup(props, context) {
    const n: Ref<number> = ref(10);
    const d = reactive({
      msg: 12399,
      num: n,
    });
    // 如果没有指定set，computed 的值为 readonly
    // const num2 = computed(() => n.value ** 2);
    // type nums = computed<T>(option: {}): Ref<T>
    const num2 = computed({
      get() {
        return n.value ** 3;
      },
      set(val) {
        n.value = 22;
      },
    });
    const stop = watchEffect(() => {
      console.log(num2.value, 'num2');
    });
    stop();
    setTimeout(() => {
      num2.value = 20;
    }, 1000);
    return {
      ab: 'aaa',
      n,
      num2,
      // d,
      ...toRefs(d),
    };
  },
});

export default HelloWorld;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
