import { ActionContext } from 'vuex';
import { GET_DATA } from './constant';
import { userState } from './store';

export default {
  [GET_DATA](state: userState, paylaod: userState['tableData']): void {
    state.tableData = paylaod;
    state.loading = false;
  },
};
