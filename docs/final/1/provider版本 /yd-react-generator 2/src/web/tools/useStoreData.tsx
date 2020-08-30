import { Context, useContext } from 'react';
import { useObserver, useLocalStore } from 'mobx-react-lite';
import React from 'react';

export const useStoreData = <Selection, ContextData, Store>(
  context: Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector?: (store: Store) => Selection
) => {
  const value = useContext(context);
  if (!value) {
    throw new Error('初始化的Context不能为null🙅‍♂️');
  }
  // const store = storeSelector(value);
  // const store = useLocalStore(() => storeSelector(value));
  // // return useObserver(() => ( <h1></h1>));
  // return useObserver(() => <div>{store}</div>);
  if (typeof dataSelector === "function") {
    return dataSelector(store);
  }
  return store;
};
