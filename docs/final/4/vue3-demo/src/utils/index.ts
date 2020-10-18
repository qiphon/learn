export function hasKey<O extends Record<string, any>>(obj: O, key: keyof any): key is keyof O {
  return obj.hasOwnProperty(key);
}

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
