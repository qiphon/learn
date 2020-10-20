import user from './modules/user';
import { userState } from './modules/user/store';
import wechat from './modules/wechat';
import { wechatState } from './modules/wechat/store';
interface State {
  user: userState;
  wechat: wechatState;
}

const modules = {
  user,
  wechat,
};

export default modules;

export { modules, State };
