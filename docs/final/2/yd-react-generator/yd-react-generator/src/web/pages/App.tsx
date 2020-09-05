import React from 'react';
import routes from '@routes/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRootData } from 'web/tools/useRootData';
const App = () => {
  const token = useRootData((store) => store.home.token);
  return (
    // <StoreProvider>
    <Router basename="/">{routes(token)}</Router>
    // </StoreProvider>
  );
};
export default App;
