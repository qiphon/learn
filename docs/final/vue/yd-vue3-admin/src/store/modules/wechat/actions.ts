import { ActionContext } from 'vuex';
import setData from './constant';
import { wechatState } from './store';

export default {
  [setData]({ commit }: ActionContext<wechatState, unknown>) {
    console.log('🌻修改题目action执行成功');
    // 📚异步数据
    setTimeout(() => {
      const payload = Math.random().toString();
      commit(setData, payload);
    }, 1000);
  },
};
