export const loginSchema = {
  body: {
    required: ["username", "password"],
    properties: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },
};

export interface LoginSchema {
  Body: {
    username: string;
    password: string;
  };
}
