type AnnounceSchema = {
  Body: {
    title: string
    fields: { name: string; value: string }[]
    channel: string
  }
}

const announceSchema = {
  body: {
    title: { type: "string" },
    fields: { type: "array" },
    channel: { type: "string" },
  },
}

export { AnnounceSchema, announceSchema }
