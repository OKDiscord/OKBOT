/* eslint-disable @typescript-eslint/ban-types */
export const removeKeys = <T extends object>(obj: T, keys: Array<keyof T>) => {
  for (const key of keys) {
    obj[key] = undefined
  }

  return obj
}

export const shallowClone = (obj: object) => {
  const newObj = {}
  Object.keys(obj).forEach(function keyLoop(key) {
    newObj[key] = obj[key]
  })
  return newObj as typeof obj
}
