/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(window["webpackJsonpyd_react_generator"] = window["webpackJsonpyd_react_generator"] || []).push([["login"],{

/***/ "./src/web/components/Login/index.tsx":
/*!********************************************!*\
  !*** ./src/web/components/Login/index.tsx ***!
  \********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _login_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.css */ \"./src/web/components/Login/login.css\");\n/* harmony import */ var _login_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_login_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _tools_useYdStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tools/useYdStore */ \"./src/web/tools/useYdStore.tsx\");\n\n // const { useContext } = React;\n// import { DatePicker } from \"antd\";\n\n\n\n\n// import { useObserver } from 'mobx-react-lite';\nvar Login = routerProps => {\n  console.log(routerProps); // const { location, history } = routerProps;\n  // let token = useRootData((store: IRootStoreModel) => store.home.token);\n  // let str = useRootData((store: IRootStoreModel) => store.home.str);\n\n  var store = (0,_tools_useYdStore__WEBPACK_IMPORTED_MODULE_3__.useYdStore)(store => store);\n  var {\n    token,\n    str\n  } = store; // const store = useYdStore((store: TStore) => store);\n  // console.log(\"跳转信息\",state.location.state.from.pathname);\n  // const RedirectUrl = location.state ? location.state.from.pathname : '/';\n  // console.log('跳转', RedirectUrl);\n\n  var RedirectUrl = '/'; // 登陆成功之后的跳转\n\n  var loginIn = () => {\n    console.log('函数生效');\n    store.str = '🏮' + Math.random();\n    store.setStr(); // console.log('状态', store);\n\n    token = localStorage['token'] = Math.random().toString(); // history.push(RedirectUrl);\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"components-login\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"span\", null, token), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"h1\", null, \"\\u52A8\\u6001\\u6570\\u636E \", str), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"span\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {\n    to: \"/\"\n  }, \"\\u9996\\u9875xxx\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {\n    to: \"/demos/123\"\n  }, \"\\u6D4B\\u8BD5\\u9875\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"input\", {\n    type: \"button\",\n    value: \"\\u767B\\u5F55\\u7CFB\\u7EDF\\u9996\\u9875\",\n    onClick: loginIn\n  })));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Login);\n\n//# sourceURL=webpack://yd-react-generator/./src/web/components/Login/index.tsx?");

/***/ }),

/***/ "./src/web/components/Login/login.css":
/*!********************************************!*\
  !*** ./src/web/components/Login/login.css ***!
  \********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://yd-react-generator/./src/web/components/Login/login.css?");

/***/ })

}]);