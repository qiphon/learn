import { createStore } from 'vuex';
import { modules, State } from './modules';

export default createStore<State>({
  modules,
});
