export const shiftMany = (array: unknown[], times: number) => {
  for (let i = 0; i < times; i++) {
    array.shift()
  }
  return array
}

export const removeByIndex = (array: unknown[], index: number) => {
  if (index > -1) {
    array.splice(index, 1)
  }
  return array
}
