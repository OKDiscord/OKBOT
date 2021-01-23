import { Message, Snowflake } from "discord.js"
import { Context } from "./context"

export interface CommandContext extends Context {
  args: string[]
}

export interface Command {
  name: string
  description?: string | Array<string>
  permissible?: {
    roles: Snowflake[] // roles
    all: boolean // whether all roles have to be present, or just one of them
  }
  run: (message: Message, context: CommandContext) => unknown
}
