import { useStore } from 'vuex';
import { State } from '@/store';

const useYdStore = () => {
  const store = useStore<State>();
  return store;
  // 自定义的进行输出结果
  // const {
  //   state,
  //   getters,
  //   dispatch,
  // }: {
  //   state: State;
  //   getters: Getters;
  //   dispatch: unknown;
  // } = store;
  // return {
  //   state,
  //   getters,
  //   dispatch,
  // };
};
export {
  useYdStore,
};
export default useYdStore;
