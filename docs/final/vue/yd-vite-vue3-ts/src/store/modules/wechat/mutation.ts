import { SET_DATA } from './constant';
import { wechatState } from './store';

export default {
  [SET_DATA](state: wechatState, paylaod: wechatState['article']): void {
    state.article = paylaod;
  },
};
