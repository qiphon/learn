import { ReturnGetters } from '@/store/utils';
import { userState } from './store';

const moduleGetters = {
  isLogin: (state: userState) => {
    console.log('额外的Getters', state);
    return `🏮${state.loading}`;
  },
};

type userGetters = ReturnGetters<typeof moduleGetters>;
export { moduleGetters, userGetters };
