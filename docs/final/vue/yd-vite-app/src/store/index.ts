import { createStore } from 'vuex';
import { userState } from './modules/user/store';
import { wechatState } from './modules/wechat/store';

import user from './modules/user';
import wechat from './modules/wechat';
import { wechatGetters } from './modules/wechat/getters';
import { userGetters } from './modules/user/getters';
type RootState = userState & wechatState;

export default createStore<RootState>({
  modules: {
    user,
    wechat,
  },
});

export interface State {
  wechat: wechatState;
  user: userState;
}
export interface Getters {
  wechat: wechatGetters;
  user: userGetters;
}
