import { setData } from './constant';
import { wechatState } from './store';
const mutations = {
  [setData](state: wechatState, payload: wechatState['article']) {
    console.log('📚数据请求', payload);
    state.article = payload;
  },
};
export { mutations };
