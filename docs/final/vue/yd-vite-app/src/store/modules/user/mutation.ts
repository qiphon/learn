import { getData } from './constant';
import { userState } from './store';
const mutations = {
  [getData](state: userState, payload: userState['tableData']) {
    console.log('📚数据请求', payload);
    state.tableData = payload;
    state.loading = false;
  },
};
export { mutations };
