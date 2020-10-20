import { defineComponent } from 'vue';
import { useYdStore } from '/@/hooks';

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
    const { state, getters } = useYdStore();
    console.log('🍊', getters['user/isLogin'], Math.random());
    // store.getters("");
    console.log('数据状态', state.wechat.article);
  },
});
