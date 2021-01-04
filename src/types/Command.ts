import { Message, Snowflake } from "discord.js"
import { Context } from "./Context"

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

export const makeCommand = (cmd: Command) => {
  if (command.description) {
    if (command.description instanceof Array) {
      command.description = (command.description as Array<string>).join("\n")
    }
  }
  if (cmd.description instanceof Array)
    cmd.description = cmd.description.join("\n")
}
