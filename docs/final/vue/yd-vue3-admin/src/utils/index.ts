// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasKey<O extends Record<string, any>>(obj: O, key: keyof any): key is keyof O {
  // eslint-disable-next-line no-prototype-builtins
  return obj.hasOwnProperty(key);
}
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
type LiteralUnion<T extends U, U = string> = T | (U & {});

export {
  hasKey,
  LiteralUnion,
  getProperty,
};
export default hasKey;
