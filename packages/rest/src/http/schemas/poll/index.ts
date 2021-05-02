import s from "fluent-json-schema";

export const pollSchema = s
  .object()
  .prop(
    "body",
    s
      .object()
      .prop("channelId", s.string())
      .prop("question", s.string())
      .prop("answers", s.array().default([]))
      .required(["question", "channelId", "answers"])
  )
  .required(["body"])
  .valueOf();

export interface PollSchema {
  Body: {
    channelId: string;
    question: string;
    answers: string[];
  };
}
