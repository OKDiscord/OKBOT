export const arrayEmpty = (array: any[]) => {
  for (const item of array) {
    if (array.includes(item)) return false
  }
  return true
}

export const objectEmpty = (obj: object) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}
