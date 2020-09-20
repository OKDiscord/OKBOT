type PollSchema = {
  Body: {
    channel: string
    question: string
    answers: string[]
  }
}

const pollSchema = {
  body: {
    channel: { type: "string" },
    question: { type: "string" },
    answers: { type: "array" },
  },
}

export { PollSchema, pollSchema }
