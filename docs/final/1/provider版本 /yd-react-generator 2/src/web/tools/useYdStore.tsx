import { createStore, RootStoreType } from '@models/root.store';
import React, { createContext } from 'react';
import { useRootData } from './useRootData';
import CreateStoreProvider from './StoreProvider';

export const storeContext = createContext<RootStoreType | null>(createStore());

export const useYdStore = useRootData(storeContext);
export const StoreProvider = CreateStoreProvider(
  () => createStore(),
  storeContext
);
