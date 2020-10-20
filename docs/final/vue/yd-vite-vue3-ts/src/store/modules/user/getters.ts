import { userState } from './store';

const modulesGetters = {
  isLogin: (state: userState): string => {
    return `🏮${state.loading}`;
  },
};
export default modulesGetters;
