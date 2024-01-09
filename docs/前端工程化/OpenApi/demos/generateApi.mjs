/**
 * 生成 API
 */
import { camelCase } from "lodash-es";
import fs from "fs";
import prettier from "prettier";
import {
  formatRequestBody,
  formatResponse,
  formatRequestParameters,
} from "./utils.mjs";

/**
 *
 * @param {OpenAPI.Document<{}>['paths']} paths
 * @param {Record<string, any>} typeObj swagger interface
 */
export const generateApi = ({ paths, typeObj, apiPath, interfacePath }) => {
  const pathObj = {};
  /** parameters & body type */
  const extraInterface = {};
  const pathRes = ``;
  const allPathString = Object.keys(paths);
  console.log(typeObj);
  if (!allPathString) throw new Error("api path 不存在");

  allPathString.forEach((path) => {
    const camelCasePath = camelCase(path.replaceAll(/(\/|{|})/g, "_"));
    // pathObj['']
    console.log(camelCasePath);
    const methods = Object.keys(paths[path]);
    if (!methods[0]) throw new Error(path + " no method exist");

    methods.forEach((method) => {
      const requestInfo = paths[path][method];
      const apiName = camelCase([method, camelCasePath]);
      const params = formatRequestParameters(requestInfo.parameters);
      // 目前看只有 parameters 会有额外的类型
      if (params) {
        extraInterface[apiName + "Props"] = Object.keys(params).reduce(
          (tmp, next) => {
            tmp[next] = params[next].typeStr;
            return tmp;
          },
          {},
        );
      }
      pathObj[apiName] = {
        path: path.replaceAll(/({[a-zA-Z]*})/g, "$$$1"),
        method,
        summary: requestInfo.summary,
        tags: requestInfo.tags,
        body: formatRequestBody(requestInfo.requestBody),
        response: formatResponse(requestInfo.responses),
        parameters: params,
      };

      if (!methods[0])
        throw new Error(path + " method " + method + " no exist");
      const { parameters, requestBody, tags } = requestInfo;
      // post 需要用到类型中的 所有字段
    });
  });

  console.log("------------补充 API 中的类型到 interface ----------------");

  fs.readFile(interfacePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.error("--------读取 API 文件失败 ---------");
      process.exit(1);
    }
    const newData = `${data} 
      /*** 一下是 API 补充类型 */
    `;
  });

  prettier
    .format(JSON.stringify(pathObj), { parser: "json" })
    .then((source) => {
      fs.writeFile(apiPath, source, (err) => {
        if (!err) {
          console.log(`api 生成完毕 in file ${apiPath}`);
        }
      });
    });
};
