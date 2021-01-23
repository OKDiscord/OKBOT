export const announceSchema = {
  required: ["channel", "title", "fields"],
  properties: {
    channel: {
      type: "string",
    },
    title: {
      type: "string",
    },
    fields: {
      type: "array",
    },
  },
}

export interface Field {
  name: string
  value: string
}

export interface AnnounceSchema {
  Body: {
    channel: string
    title: string
    fields: Field[]
  }
}
