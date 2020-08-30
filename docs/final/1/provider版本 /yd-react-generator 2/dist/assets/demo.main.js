/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(window["webpackJsonpyd_react_generator"] = window["webpackJsonpyd_react_generator"] || []).push([["demo"],{

/***/ "./src/web/components/demo/DemoStore.tsx":
/*!***********************************************!*\
  !*** ./src/web/components/demo/DemoStore.tsx ***!
  \***********************************************/
/*! namespace exports */
/*! export DemoStoreProvider [provided] [no usage info] [missing usage info prevents renaming] */
/*! export useDemoStore [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useDemoStore\": () => /* binding */ useDemoStore,\n/* harmony export */   \"DemoStoreProvider\": () => /* binding */ DemoStoreProvider\n/* harmony export */ });\n/* harmony import */ var _tools_useRootData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tools/useRootData */ \"./src/web/tools/useRootData.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _tools_StoreProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tools/StoreProvider */ \"./src/web/tools/StoreProvider.tsx\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\n// export interface IToDos {\n//   id: number;\n//   todos: Todo[];\n//   remainingTodos: number;\n//   test(): void;\n//   toggleTodo: ItoggleTodo;\n// }\nfunction createTodosStore() {\n  return {\n    todos: [{\n      id: 1,\n      text: '完成React SSR配置',\n      completed: true\n    }, {\n      id: 2,\n      text: '完成业务逻辑的基本开发',\n      completed: false\n    }],\n    id: 0,\n\n    get remainingTodos() {\n      return this.todos.filter(t => !t.completed).length;\n    },\n\n    test() {// const data = await fetch('/api/test');\n      // const result = await data.json();\n      // todosStore.id = result.id;\n\n      return _asyncToGenerator(function* () {})();\n    },\n\n    toggleTodo(index) {\n      var _index = parseInt(index.toString(), 10);\n\n      this.todos[_index].completed = !this.todos[_index].completed;\n      console.log('🌲', this.todos[_index].completed);\n    }\n\n  };\n}\n\n// export class TodosStore implements IToDos {\n//   public todos: Todo[];\n//   public id: number;\n//   constructor() {\n//     this.todos = [\n//       { id: 1, text: '完成React SSR配置', completed: true },\n//       { id: 2, text: '完成业务逻辑的基本开发', completed: false },\n//     ];\n//     this.id = 0;\n//     this.toggleTodo = this.toggleTodo.bind(this);\n//   }\n//   public get remainingTodos() {\n//     return this.todos.filter((t) => !t.completed).length;\n//   }\n//   public async test() {\n//     const data = await fetch('/api/test');\n//     const result = await data.json();\n//     this.id = result.id;\n//   }\n//   public toggleTodo(index: string | number) {\n//     const _index = parseInt(index.toString(), 10);\n//     this.todos[_index].completed = !this.todos[_index].completed;\n//     console.log('🌲', this.todos[_index].completed);\n//   }\n// }\n// const todoStore = new TodosStore();\nvar todoStore = createTodosStore();\nvar storeContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(todoStore);\nvar useDemoStore = (0,_tools_useRootData__WEBPACK_IMPORTED_MODULE_0__.useRootData)(storeContext);\nvar DemoStoreProvider = (0,_tools_StoreProvider__WEBPACK_IMPORTED_MODULE_2__.default)(() => todoStore, storeContext);\n\n//# sourceURL=webpack://yd-react-generator/./src/web/components/demo/DemoStore.tsx?");

/***/ }),

/***/ "./src/web/components/demo/Footer.tsx":
/*!********************************************!*\
  !*** ./src/web/components/demo/Footer.tsx ***!
  \********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react-lite */ \"./node_modules/mobx-react-lite/dist/mobxreactlite.esm.js\");\n/* harmony import */ var _DemoStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DemoStore */ \"./src/web/components/demo/DemoStore.tsx\");\n\n\n\nvar Footer = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__.observer)(() => {\n  var store = (0,_DemoStore__WEBPACK_IMPORTED_MODULE_1__.useDemoStore)(store => store);\n  var remaining = store.remainingTodos;\n  var total = store.todos.length;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"p\", null, remaining.toString(), \" / \", total.toString(), \" left\");\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);\n\n//# sourceURL=webpack://yd-react-generator/./src/web/components/demo/Footer.tsx?");

/***/ }),

/***/ "./src/web/components/demo/TodoList.tsx":
/*!**********************************************!*\
  !*** ./src/web/components/demo/TodoList.tsx ***!
  \**********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _DemoStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DemoStore */ \"./src/web/components/demo/DemoStore.tsx\");\n/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react-lite */ \"./node_modules/mobx-react-lite/dist/mobxreactlite.esm.js\");\n // import { toggleTodo, Todo } from './DemoStore';\n\n\n\nvar TodoList = (0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__.observer)(() => {\n  var {\n    todos,\n    toggleTodo\n  } = (0,_DemoStore__WEBPACK_IMPORTED_MODULE_1__.useDemoStore)(store => ({\n    todos: store.todos,\n    toggleTodo: store.toggleTodo\n  }));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"ul\", {\n    style: {\n      listStyle: 'none'\n    }\n  }, todos && todos.map((t, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", {\n    onClick: () => toggleTodo(i),\n    style: {\n      margin: 10,\n      opacity: t.completed ? 0.5 : 1,\n      cursor: 'pointer',\n      textDecoration: t.completed ? 'line-through' : 'none'\n    },\n    key: t.id\n  }, t.text)));\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoList);\n\n//# sourceURL=webpack://yd-react-generator/./src/web/components/demo/TodoList.tsx?");

/***/ }),

/***/ "./src/web/components/demo/index.tsx":
/*!*******************************************!*\
  !*** ./src/web/components/demo/index.tsx ***!
  \*******************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _demo_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo.css */ \"./src/web/components/demo/demo.css\");\n/* harmony import */ var _demo_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_demo_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _DemoStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DemoStore */ \"./src/web/components/demo/DemoStore.tsx\");\n/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TodoList */ \"./src/web/components/demo/TodoList.tsx\");\n/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Footer */ \"./src/web/components/demo/Footer.tsx\");\n\n\n\n\n\n\nvar Demo = routerProps => {\n  console.log('传参', routerProps.match.params.id);\n  var todosStore = (0,_DemoStore__WEBPACK_IMPORTED_MODULE_2__.useDemoStore)();\n  var {\n    id,\n    test\n  } = todosStore;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_DemoStore__WEBPACK_IMPORTED_MODULE_2__.DemoStoreProvider, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_TodoList__WEBPACK_IMPORTED_MODULE_3__.default, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Footer__WEBPACK_IMPORTED_MODULE_4__.default, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"h3\", null, id), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"input\", {\n    type: \"button\",\n    value: \"\\u6D4B\\u8BD5\\u5F02\\u6B65\\u8BF7\\u6C42\",\n    onClick: () => test()\n  })));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Demo);\n\n//# sourceURL=webpack://yd-react-generator/./src/web/components/demo/index.tsx?");

/***/ }),

/***/ "./src/web/components/demo/demo.css":
/*!******************************************!*\
  !*** ./src/web/components/demo/demo.css ***!
  \******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://yd-react-generator/./src/web/components/demo/demo.css?");

/***/ })

}]);