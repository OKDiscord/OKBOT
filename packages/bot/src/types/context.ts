import { Client } from "discord.js"
import { Mongoose } from "mongoose"
import { Command } from "./command"

// Context for all controllers, events and other stuff
export interface Context {
  client: Client
  db: Mongoose
  commands: Command[]
}

export default Context
