import { PrismaClient } from "@prisma/client"
import { Client } from "discord.js"
import { Command } from "./command"

// Context for all controllers, events and other stuff
export interface Context {
  client: Client
  db: PrismaClient
  commands: Command[]
}

export default Context
