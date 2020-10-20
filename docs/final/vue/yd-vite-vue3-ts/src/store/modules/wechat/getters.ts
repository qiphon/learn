import { wechatState } from './store';

const modulesGetters = {
  isLogin: (state: wechatState): string => {
    return `🏮${state.article}`;
  },
};
export default modulesGetters;
