import { Client } from "discord.js"
import { Mongoose } from "mongoose"
import { Command } from "./command"
import { Fasteer } from "@fasteerjs/fasteer"

// Context for all controllers, events and other stuff
export interface Context {
  client: Client
  db: Mongoose
  commands: Command[]
  server: Fasteer.Fasteer
}

export default Context
