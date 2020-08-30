import React from 'react';
import routes from '@routes/index';
import { BrowserRouter as Router } from 'react-router-dom';
// import StoreProvider from '../tools/StoreProvider';
import { RootStoreType } from '@models/root.store';
import { useYdStore, StoreProvider } from 'web/tools/useYdStore';
// export interface IAppProps {
//   router: React.ComponentType;
//   // tslint:disable-next-line:no-any
//   routes: React.ComponentType<any>;
// }
// const Layout = () => <Router basename="/">routes(token)</Router>;
const App = () => {
  // const store = useYdStore<RootStoreType>();
  const token = useYdStore((store) => store.token);
  return (
    <StoreProvider>
      <Router basename="/">{routes(token)}</Router>
    </StoreProvider>
  );
};
export default App;
