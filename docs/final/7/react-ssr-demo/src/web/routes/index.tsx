import React from "react";
import { Route, Switch, RouteProps } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import NotFound from "../components/NotFound";
import { getData } from "../api/books/api";
interface YDProps extends RouteProps {
  loadData?: Function;
}
export const routes: YDProps[] = [
  {
    path: "/",
    exact: true,
    component: Home,
    loadData: () => getData(),
  },
  {
    path: "/about",
    exact: true,
    component: About,
  },
];
const Routes = () => (
  <Switch>
    {routes.map((r, index) => {
      const { path, exact, component } = r;
      const LazyCom = component;
      return (
        <Route key={index} path={path} exact={exact} component={LazyCom} />
      );
    })}
    <Route component={NotFound} />
  </Switch>
);
export default Routes;
