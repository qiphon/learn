import { mutations } from './mutation';
import actions from './actions';
import { moduleGetters } from './getters';
import { createState } from './store';
const moduleState = createState();
export default {
  namespaced: true,
  state: moduleState,
  getters: moduleGetters,
  mutations,
  actions,
};
