import { ReturnGetters } from '@/store/utils';
import { wechatState } from './store';

const moduleGetters = {
  showArticle: (state: wechatState) => {
    console.log('题库额外的Getters', state);
    return `🏮${state.article}`;
  },
};

type wechatGetters = ReturnGetters<typeof moduleGetters>;
// type Getters = typeof moduleGetters;
export { moduleGetters, wechatGetters };
