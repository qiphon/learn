import * as React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { RootStoreType, createStore } from '@models/root.store';
// import makeInspectable from 'mobx-devtools-mst';

export const storeContext = React.createContext<RootStoreType | null>(
  createStore()
);

const CreateStoreProvider = (
  detaultStore: () => {},
  storeContext: React.Context<any>
) => {
  const StoreProvider: React.FC = ({ children }) => {
    const store = useLocalStore(detaultStore);
    // makeInspectable(store);
    return (
      <storeContext.Provider value={store}>{children}</storeContext.Provider>
    );
  };
  return StoreProvider;
};

export default CreateStoreProvider;
