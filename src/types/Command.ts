import { Message } from "discord.js"
import { Context } from "./Context"

export interface CommandContext extends Context {
  args: string[]
}

export interface Command {
  name: string
  description?: string | Array<string>
  run: (message: Message, context: CommandContext) => unknown
}
