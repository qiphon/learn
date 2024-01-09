import { upperFirst, camelCase } from "lodash-es";

export const toUpperCamelcase = (str) => upperFirst(camelCase(str));
const schemasStart = "#/components/schemas/";

/** 从 ref 中获取类型的名称 按道理 ref 中的所有值都已经生成了类型
 * @param {string|undefined} ref
 */
export const getTypeNameFromRef = (ref) => {
  if (!ref) return;
  return toUpperCamelcase(ref.replace(schemasStart, ""));
};

/**
 * @param {string} type
 * @returns
 */
export const typesMap = (type) => {
  const typeMap = {
    integer: "number",
  };
  return String(typeMap[type] ?? type).toLowerCase();
};

/** return type str */
export const getPropertyItemType = (propertyItem) => {
  const currentType = typesMap([propertyItem.type]) || "unknown";
  const typeNameInPath = getTypeNameFromRef(propertyItem?.$ref);

  // 是通过 ref 指向的类型
  if (typeNameInPath) {
    return typeNameInPath;
  }

  if (currentType === "array" && propertyItem?.items) {
    return getPropertyItemType(propertyItem.items) + "[]";
  }
  return currentType;
};

/** getType from parameters
 * @param { {name: string, in: 'path', required: boolean,description: '', schema: {type: string, format: string}} } parameter
 */
const getParameterType = (parameter) => {
  const type = getPropertyItemType(parameter.schema);
  return {
    in: parameter.in,
    description: parameter.description,
    typeStr: `/** ${parameter.description ?? ""} ${parameter.schema.format} */
    ${parameter.name}${parameter.required ? "" : "?"}: ${type}`,
  };
};

/**
 * enum 类型生成
 * 由于 number 类型的enum 会有问题，会将其类型转换
 */
export const generateEnum = (properties) => {
  const enums = properties.enum;
  const type = typesMap(properties.type);
  return enums.reduce((tmp, next) => {
    if (type === "number") {
      return `${tmp}
        | ${next}
      `;
    } else {
      return `${tmp}
      '${next}' = '${next}',
    `;
    }
  }, ``);
};

/**
 * api request body format
 * @param {OpenAPI.Document<{}>['paths']['requestBody']} requestBody
 */
export const formatRequestBody = (requestBody) => {
  const bodyJson = requestBody?.content?.["application/json"];
  if (!bodyJson) return;
  const schema = bodyJson.schema;
  return getPropertyItemType(schema);
};

/**
 * api request body format
 * @param {OpenAPI.Document<{}>['paths']['parameters']} parameters
 */
export const formatRequestParameters = (parameters) => {
  if (!parameters?.length) return;
  return parameters.reduce((type, next) => {
    type[next.name] = getParameterType(next);
    return type;
  }, {});
};

/**
 * api request body format
 * @param {OpenAPI.Document<{}>['paths']['responses']} requestBody
 */
export const formatResponse = (response) => {
  const response200 = response?.[200];
  const responseKeys = Object.keys(response200 ?? {});
  if (!responseKeys) return;
  const responseContent = response200?.content?.["application/json"];
  if (!responseContent) return;
  if (!responseContent?.schema) {
    console.log("----------no schema in response-----------");
    console.log(responseContent);
  }
  return getPropertyItemType(responseContent.schema);
};
