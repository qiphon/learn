import USER_CONSTANT from './constant';
import { userState } from './store';

const { GET_DATA } = USER_CONSTANT;
const mutations = {
  [GET_DATA](state: userState, payload: userState['tableData']) {
    console.log('📚数据请求', payload);
    state.tableData = payload;
    state.loading = false;
  },
};
export default mutations;
export { mutations };
