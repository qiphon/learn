# [vite](https://vitejs.dev/)

### config 

vue.config.ts 配置说明

```ts
// 为配置定义的 ts 
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";

// console.log(path.resolve(__dirname, "../src/components"));
// exit(1);

// https://vitejs.dev/config/
const config = defineConfig({
  // ---------- shared options start
  // html 静态页面目录
  root: "./",
  // url 路径 default /
  base: "/",
  // mode:  'development' for serve, 'production' for build
  mode: "development",
  publicDir: "build",
  // 获取全局变量,改变变量的名字
  // define: {
  //   publicPath: "qiphon",
  // },
  // 路径别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@components": path.resolve(__dirname, "../src/components"),
    },
  },
  css: {
    modules: {
      scopeBehaviour: "local",
    },
    // postcss.config.js same
    // postcss: {},
  },
  //
  json: {
    // Whether to support named imports from .json files.
    // namedExports: true
    // json 文件是否以 字符串的形式引入，这种形式。这比Object形式性能要高得多，尤其是在JSON文件较大时。
    // stringify:
  },
  // esbuild 打包的参数，主要应用于 ts、jsx、tsx，需要参考esbuild
  // esbuild:{},
  /**
   * 可以让资源不被 plugin （没有使用 enforce: 'pre' 的） 处理
   * https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts
   */
  // assetsInclude:
  logLevel: "info",
  clearScreen: false,
  plugins: [reactRefresh()],
  // -------------------- Server Options start
  server: {
    host: "qiphon.com",
    port: 3001,
    // when true，if port in use will exit
    strictPort: false,
    // Enable TLS + HTTP/2. Note this downgrades to TLS only when the server.proxy option is also used.
    // The value can also be an options object passed to https.createServer().
    // https: string | obj
    // open broswer
    // open: false,
    // request proxy for development
    // proxy: {
    //   // string shorthand
    //   "/foo": "http://localhost:4567/foo",
    //   // with options
    //   "/api": {
    //     target: "http://jsonplaceholder.typicode.com",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    //   // with RegEx
    //   "^/fallback/.*": {
    //     target: "http://jsonplaceholder.typicode.com",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/fallback/, ""),
    //   },
    // },
    // cors: // 跨域配置项，默认允许任何源
    force: true, // Set to true to force dependency pre-bundling.
    // hmr:
    // https://github.com/paulmillr/chokidar#api
    // watch:
  },
  // --------------------- build options start ---------------
  build: {
    /**
     * * Default: 'modules' - Similar to `@babel/preset-env`'s targets.esmodules,
     * transpile targeting browsers that natively support es module imports. Also
     * injects a light-weight dynamic import polyfill.
     * https://caniuse.com/es6-module
     *
     * esnext 会以最小化程度进行编译，谨慎使用
     * * Another special value is 'esnext' - which only performs minimal trasnpiling
     * (for minification compat) and assumes native dynamic imports support.
     */
    // target: ""
    // Default: true unless build.target is 'esnext' , will inject import 'vite/dynamic-import-polyfill' to html
    polyfillDynamicImport: true,
    // 打包后的文件路径
    outDir: "build",
    // By default, Vite will empty the outDir on build if it is inside project root. 删除之前的打包文件
    emptyOutDir: true,
    // 静态资源路径
    // assetsDir: string
    /**
     * Imported or referenced assets that are smaller than this threshold will be inlined as base64 URLs to avoid extra http requests. Set to 0 to disable inlining altogether.
     * 静态资源小于多少时使用base64 形式内联写入
     * */
    assetsInlineLimit: 8 * 1024,
    /**
     * false：所有的 css 会被打包到一个css文件中
     * true：css样式文件会拆分到各个异步chunk 中
     */
    cssCodeSplit: true,
    sourcemap: true,
    // https://rollupjs.org/guide/en/#big-list-of-options
    // rollupOptions:
    // Options to pass on to @rollup/plugin-commonjs.   https://github.com/rollup/plugins/tree/master/packages/commonjs
    // commonjsOptions:
    //
    // lib:
    // When set to true, the build will also generate a manifest.json
    manifest: true,
    minify: false,
    // Additional minify options to pass on to Terser.
    // terserOptions:
    // Constructor options to pass on to clean-css.  https://github.com/jakubpawlowicz/clean-css#constructor-options
    // cleanCssOptions:
    //
    // write:
    // 是否启用 brotli 压缩，IE 不支持
    brotliSize: false,
    // chunk 超大警告显示
    chunkSizeWarningLimit: 300,
  },
  // -----------------  Dep Optimization Options   Related: Dependency Pre-Bundling
  optimizeDeps: {
    // 以指定依赖作为入口
    // entries:
    // 不参与 pre-build 的文件
    // exclude:
    // include:
  },
  // ---------- SSR Options in minor releases
});

console.log("building mode : " + config.mode);

export default config;

```