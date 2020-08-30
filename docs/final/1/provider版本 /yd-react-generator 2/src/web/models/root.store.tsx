// import { observable } from 'mobx';
const ydStore = {
  Cities: ['北京', '深圳', '上海'],
};

export const createStore = () => {
  const store = {
    str: '京程一灯',
    token: localStorage['token'],
    setStr() {
      store.str = Math.random() + '🏮';
    },
    get allCities() {
      return ydStore.Cities;
    },
  };
  return store;
};

export type RootStoreType = ReturnType<typeof createStore>;
