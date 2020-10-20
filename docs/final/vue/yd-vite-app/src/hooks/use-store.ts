import { useStore } from 'vuex';
import store, { State, Getters } from '../store';

export const useYdStore = () => {
  const store = useStore<State>();
  return store;
};

// const {
//   state,
//   getters,
//   dispatch,
// }: {
//   state: State;
//   getters: Getters;
//   dispatch: any;
// } = store;
// return {
//   state,
//   getters,
//   dispatch,
// };
