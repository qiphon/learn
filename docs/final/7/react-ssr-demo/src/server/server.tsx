import { resolve, join } from "path";
import axios from "axios";
import Router from "@koa/router";
import Koa from "koa";
import serve from "koa-static";
import fs from "fs";
import { renderToString } from "react-dom/server";
import { booksList, booksDetails } from "./mock/books";
const serverBundle = require("../../dist/server-entry").default;

const app = new Koa();
const router = new Router();
router.get("/api/getData", (ctx: Koa.Context) => {
  const results = {
    code: 0,
    message: "",
    data: booksList,
  };
  ctx.body = JSON.stringify(results);
});
const injectBody = (index: string, title: string, body: string,recoilInitData:any) => {
  index = index
    .replace(/<title>.*?<\/title>/g, `<title>${title}</title>`)
    .replace(`<div id="main"></div>`, `<div id="main">${body}</div><script>window.__INITIAL__DATA__ = ${JSON.stringify(recoilInitData)}</script>`);
  return index;
};
router.get(["/", "/about"], async (ctx: Koa.Context) => {
  const JSXString = await serverBundle(ctx);
  const index = fs.readFileSync("../../dist/assets/index.html", "utf8");
  // console.log("initData", ctx.recoilInitData);
  const html = injectBody(index, "SSR页面", renderToString(JSXString),ctx.recoilInitData);
  ctx.body = html;
});
app.on("error", console.error);
app.use(serve(join(__dirname, "../../dist")));
/* 
allowedMethods处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头.
如果我们不设置router.allowedMethods()在表现上除了ctx.status不会自动设置,以及response header中不会加上Allow之外,不会造成其他影响.
如果要设置,建议按照官方的写法,搞成全局的
*/
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
