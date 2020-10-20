<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <h4>🐻Vuex状态管理</h4>
  <p>
    <code>{{ article }}</code>
    <button @click="setData">修改状态</button>
  </p>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useYdStore } from '../hooks';
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  setup(props) {
    const { state, getters, dispatch } = useYdStore();
    // const editTodo = (todo, value) =>
    //   store.dispatch("editTodo", { todo, value });
    console.log('🐩', getters['wechat/showArticle']);
    const setData = () => dispatch('wechat/setData');
    // console.log("项目初始化", store.state.wechat.article);
    return {
      article: computed(() => state.wechat.article),
      setData,
    };
  },
});
</script>

<style lang="postcss" scoped>
h1 {
  --helloColor: orange;
  color: var(--helloColor);
}
p {
  & code {
    color: green;
  }
}
</style>
