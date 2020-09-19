type AnnounceSchema = {
  Body: { title: string; fields: { title: string; value: string }[] }
}

const announceSchema = {
  body: { title: { type: "string" }, fields: { type: "array" } },
}

export { AnnounceSchema, announceSchema }
