import { useStore } from 'vuex';
import { Getters } from '../store/utils';
import { State } from '/@/store/modules';
interface IUseYdStore {
  state: State;
  getters: Getters;
}

const useYdStore = (): IUseYdStore => {
  const store = useStore<State>();
  const { state, getters } = store;
  return {
    state,
    getters,
  };
  // return store;
};
export { useYdStore };
export default useYdStore;
