"use strict";

var _path = require("path");

var _router = _interopRequireDefault(require("@koa/router"));

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _fs = _interopRequireDefault(require("fs"));

var _server = require("react-dom/server");

var _books = require("./mock/books");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const serverBundle = require("../../dist/server-entry").default;

const app = new _koa.default();
const router = new _router.default();
router.get("/api/getData", ctx => {
  const results = {
    code: 0,
    message: "",
    data: _books.booksList
  };
  ctx.body = JSON.stringify(results);
});

const injectBody = (index, title, body, recoilInitData) => {
  index = index.replace(/<title>.*?<\/title>/g, `<title>${title}</title>`).replace(`<div id="main"></div>`, `<div id="main">${body}</div><script>window.__INITIAL__DATA__ = ${JSON.stringify(recoilInitData)}</script>`);
  return index;
};

router.get(["/", "/about"], async ctx => {
  const JSXString = await serverBundle(ctx);

  const index = _fs.default.readFileSync("../../dist/assets/index.html", "utf8"); // console.log("initData", ctx.recoilInitData);


  const html = injectBody(index, "SSR页面", (0, _server.renderToString)(JSXString), ctx.recoilInitData);
  ctx.body = html;
});
app.on("error", console.error);
app.use((0, _koaStatic.default)((0, _path.join)(__dirname, "../../dist")));
/* 
allowedMethods处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头.
如果我们不设置router.allowedMethods()在表现上除了ctx.status不会自动设置,以及response header中不会加上Allow之外,不会造成其他影响.
如果要设置,建议按照官方的写法,搞成全局的
*/

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});