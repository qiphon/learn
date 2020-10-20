import { createState } from './store';
import actions from './actions';
import mutations from './mutation';
import modulesGetters from './getters';

const moduleState = createState();
export default {
  namespaced: true,
  state: moduleState,
  getters: modulesGetters,
  mutations,
  actions,
};
