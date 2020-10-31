import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import App from "../pages/App";
import { Context } from "koa";
import { RecoilRoot } from "recoil";
import { routes } from "../routes";
// import { atom } from "recoil";
// const currentBookState = atom({
//   key: "currentBook",
//   default: [],
// });
export default (ctx: Context) => {
  const routerPath = ctx.request.url;
  return new Promise((resolve, reject) => {
    const promises: Array<Promise<any>> = [];
    routes.some((route) => {
      // matchPath 就是匹配前端的路由
      const match = matchPath(ctx.request.path, route);
      // 如果匹配到了前端路由，并且有这个方法，
      if (match && route.loadData) promises.push(route.loadData());
      return match;
    });
    Promise.all(promises).then((data) => {
      let initializeState;
      if (routerPath === "/" && data.length > 0) {
        ctx.recoilInitData = data[0].data;
        initializeState = ({ set }: any) => {
          set({ key: "currentBook" }, data[0].data);
        };
      }
      // initializeState={initializeState}
      resolve(
        <RecoilRoot initializeState={initializeState}>
          <StaticRouter location={ctx.request.url}>
            <App />
          </StaticRouter>
        </RecoilRoot>
      );
    });
  });
};
