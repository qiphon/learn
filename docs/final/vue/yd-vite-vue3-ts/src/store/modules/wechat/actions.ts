import { ActionContext } from 'vuex';
import { SET_DATA } from './constant';
import { wechatState } from './store';

export default {
  [SET_DATA]({ commit }: ActionContext<wechatState, unknown>): void {
    console.log('🌻', '微信-->  action派发成功');
    setTimeout(() => {
      const payload: wechatState['article'] = Math.random().toString();
      commit(SET_DATA, payload);
    });
  },
};
