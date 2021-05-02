/**
 * This code is a working Proof-of-Concept to making dynamic
 * getters and setters, however it is not typed at all, therefore not
 * worth using in production, yet. Once it is possible, I will take a look at it,
 * properly type it and use it.
 */

const createFunctionName = (type: string, key: string) =>
  [type, key]
    .join(" ")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())

const createApiForObject = (store: { [key: string]: any }) => {
  const _return: { [key: string]: any } = []

  for (const key in store) {
    _return[createFunctionName("get", key)] = () => store[key]

    _return[createFunctionName("set", key)] = (value: unknown) =>
      (store[key] = value)

    if (Array.isArray(store[key]))
      _return[createFunctionName("add", key)] = (value: unknown) =>
        (store[key] = [...store[key], value])
  }

  return _return
}

export { createApiForObject }
