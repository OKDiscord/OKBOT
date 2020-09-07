type Difference = {
  ms: number
  seconds: number
  minutes: number
  hours: number
}
type TestFunction = (callback: TestCallback) => unknown
type TestCallback = (
  callback: (start: number, end: number, difference: Difference) => unknown
) => unknown

export const benchFunction = (test: TestFunction) => {
  const start = +new Date()
  test &&
    test((callback) => {
      const end = +new Date()
      const difference = end - start
      callback &&
        callback(start, end, {
          ms: difference,
          seconds: (difference / 1000) % 60,
          minutes: (difference / (1000 * 60)) % 60,
          hours: (difference / (1000 * 60 * 60)) % 24,
        })
    })
}
