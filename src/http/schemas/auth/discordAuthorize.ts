export const discordAuthSchema = {
  body: {
    required: ["code"],
    properties: {
      code: {
        type: "string",
      },
    },
  },
}

export interface DiscordAuthSchema {
  Body: {
    code: string
  }
}
