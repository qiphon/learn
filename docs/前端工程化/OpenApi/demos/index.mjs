import Swagger from "@apidevtools/swagger-parser";
import path from "path";
import fs from "fs";
import prettier from "prettier";
import { generateApi } from "./generateApi.mjs";
import {
  toUpperCamelcase,
  typesMap,
  getPropertyItemType,
  generateEnum,
} from "./utils.mjs";

const parseRes = await Swagger.parse("swagger.json",
);

const { info, components, paths } = parseRes;
const __dirname = new URL(".", import.meta.url).pathname;
const outDir = path.resolve(__dirname, "../docs");
const apiPath = path.resolve(outDir, "api.ts");
const interfacePath = path.resolve(outDir, "interface.ts");

const fileInfo = `
/**
 * @file ${info.title} ${info.version}
 * @description ${info.summary || ""}
 * @description ${info.description || ""}
 * openApi version ${parseRes.openapi}
*/

`;
/** 生成 interface 开始 */
const types = components.schemas;

if (!types) throw new Error("get types error in components/schemas");

/** 所有的 interface key 集合 */
const tsObject = {};

/**
 * type = object properties
 * @param {*} properties
 * @param {*} keys
 * @returns
 *  {key1: typeStr
 *  key2: typeStr}
 */
const addPropertiesKey = (properties, keys) =>
  keys.reduce((tmp, key) => {
    if (["string", "boolean"].includes(typeof properties[key])) return tmp;
    const currentType = getPropertyItemType(properties[key]);

    tmp[key] = `${key}${
      properties[key]?.nullable ? "?:" : ":"
    } ${currentType};`;
    return tmp;
  }, {});

/**
 *  {key1: typeStr (typeStr eg. 'key1: string;')
 *  key2: typeStr} to
 *   `key1: type
 *  key2: type`
 */
const propertiesObj2Str = (obj) => {
  let res = ``;
  Object.keys(obj).forEach((k) => {
    res = `${res}
      ${obj[k]}`;
  });
  return res;
};

const typesKey = Object.keys(types);

const typeStr = typesKey.reduce((tmpStr, next) => {
  let currentStr = ``;
  const typeObj = types[next];

  if (typeObj.enum) {
    tsObject[toUpperCamelcase(next)] = generateEnum(typeObj);
    if (typesMap(typeObj.type) === "number") {
      currentStr = `export type ${toUpperCamelcase(next)} = 
      ${tsObject[toUpperCamelcase(next)]}
      `;
    } else {
      currentStr = `export enum ${toUpperCamelcase(next)} {
        ${propertiesObj2Str(tsObject[toUpperCamelcase(next)])}
      }
      `;
    }
  } else if (typeObj?.type === "object") {
    tsObject[toUpperCamelcase(next)] = addPropertiesKey(
      typeObj.properties,
      Object.keys(typeObj.properties),
    );
    currentStr = `export interface ${toUpperCamelcase(next)} {
      ${propertiesObj2Str(tsObject[toUpperCamelcase(next)])}
    }
    `;
  }

  return `${tmpStr}
    ${currentStr}`;
}, "");

const isInterfacePathExist = fs.existsSync(interfacePath);

if (!isInterfacePathExist) {
  fs.mkdirSync(outDir, { recursive: true });
}

const interfaceSource = fileInfo + typeStr;

await prettier
  .format(interfaceSource, { parser: "typescript" })
  .then((source) => {
    fs.writeFile(interfacePath, source, (err) => {
      if (!err) {
        console.log(`interface 生成完毕 in file ${interfacePath}`);
      }
    });
  });

// 生成 API 开始
generateApi({ paths, tsObject, apiPath, interfacePath });
