import { Client } from "discord.js"
import { Command } from "../types/Command"

export interface Context {
  discord: {
    instance: Client
    commands: Command[]
  }
}
