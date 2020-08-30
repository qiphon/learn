import { useStoreData } from "./useStoreData";
// import { storeContext } from "./StoreProvider";
// import { RootStoreType } from "@models/root.store";
import { Context } from "react";

// export const useRootData = <Selection>(dataSelector: (store: TStore) => Selection) =>
//   useStoreData(storeContext, contextData => contextData!, dataSelector);

export const useRootData = <TStore>(storeContext: Context<TStore>) => <Selection>(
  dataSelector?: (store: TStore) => Selection
) => useStoreData(storeContext, contextData => contextData!, dataSelector);


