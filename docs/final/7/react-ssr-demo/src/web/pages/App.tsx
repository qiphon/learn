import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "../routes/index";
import Loading from "../components/Loading";
import { RecoilRoot } from "recoil";
export const getInitialData = () => {
  const initalData = window.__INITIAL__DATA__ || [];
  window.__INITIAL__DATA__ = undefined;
  console.log(initalData);
  return initalData;
};
function initializeState({ set }: any): void {
  set({ key: "currentBook" }, getInitialData);
}
const App = () => {
  return routes();
};
export const ClientApp = () => (
  <RecoilRoot initializeState={initializeState}>
    <Suspense fallback={<Loading />}>
      <Router basename='/'>
        <App />
      </Router>
    </Suspense>
  </RecoilRoot>
);
export default App;
