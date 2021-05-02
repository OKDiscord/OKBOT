import s from "fluent-json-schema";

export const loginSchema = s
  .object()
  .prop(
    "body",
    s
      .object()
      .prop("username", s.string())
      .prop("password", s.string())
      .required(["username", "password"])
  )
  .required(["body"])
  .valueOf();

export interface LoginSchema {
  Body: {
    username: string;
    password: string;
  };
}
