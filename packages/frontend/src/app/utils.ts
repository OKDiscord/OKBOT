import { isRef, Ref } from "vue"

const arrayEmpty = (array: any[]) => {
  for (const item of array) {
    if (array.includes(item)) return false
  }
  return true
}

const objectEmpty = (obj: object) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

const awaitBoolRef = (ref: Ref<boolean>, promise: Promise<any>) => {
  ref.value = true
  promise.then(() => (ref.value = false)).catch(() => (ref.value = false))

  return promise
}

const unref = <T>(val: T | Ref<T>): T => (isRef(val) ? val.value : val)

export { arrayEmpty, objectEmpty, unref, awaitBoolRef }
