import { ActionContext } from 'vuex';
import { GET_DATA } from './constant';
import { userState } from './store';

export default {
  [GET_DATA]({ commit }: ActionContext<userState, unknown>): void {
    console.log('🌻', 'action派发成功');
    setTimeout(() => {
      const payload: userState['tableData'] = [
        {
          data: '京程一灯',
          name: '老袁',
          age: 4,
        },
      ];
      commit(GET_DATA, payload);
    });
  },
};
