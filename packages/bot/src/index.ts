//Libs mad
import * as Discord from "discord.js"
import { sync as glob } from "glob"
import fs from "fs"
import path from "path"
import { cfg, createLogger } from "@okbot/core"

import { PrismaClient } from "@prisma/client"
import { Command } from "./types/command"
import { Event } from "./types/event"
import { Context, EnvironmentType } from "./types"

export const logger = createLogger()

export class Main {
  // Variables
  client: Discord.Client
  db = new PrismaClient()

  commands: Command[] = []

  ctx = (): Context => ({
    client: this.client,
    db: this.db,
    commands: this.commands,
  })

  constructor() {
    this.client = new Discord.Client()
  }

  async init() {
    logger.info(`OKBOT ${Main.version()}`)
    await this.initDiscord()
    await this.initCommands()
    await this.initDiscordEvents()
  }

  async initDiscord() {
    try {
      await this.client.login(cfg.discord.botToken())

      this.client.user.setPresence({
        activity: { name: `${cfg.discord.prefix}help` },
        status: "online",
      })

      const {
        user: { username, discriminator },
      } = this.client

      logger.info(`Connected to Discord as ${username}#${discriminator}`)
    } catch (e) {
      logger.error("Cannot login to Discord.")
      logger.error(e)
      process.exit(1)
    }
  }

  async initCommands() {
    const files = glob(
      path.join(
        __dirname,
        "discord",
        "commands",
        Main.env() === "development" ? "*.ts" : "*.js"
      )
    )

    for (const file of files) {
      const cmd = await import(file)
      if (typeof cmd.default === "function") {
        logger.warn(
          `Command ${
            path.parse(file).base
          } is using the deprecated Class-like command. Consider switching to the Functional command.`
        )
        this.commands.push(cmd.default() as Command)
      } else if (typeof cmd.default === "object") {
        this.commands.push(cmd.default as Command)
      }
    }
  }

  async initDiscordEvents() {
    const files = glob(path.join(__dirname, "discord", "events", "*.ts"))

    for (const file of files) {
      const evt = await import(file)
      let event: Event<keyof Discord.ClientEvents>

      if (typeof evt.default === "function") {
        logger.warn(
          `Event ${
            path.parse(file).base
          } is using the deprecated Class-like event. Consider switching to the Functional event.`
        )
        event = evt.default()
      } else if (typeof evt.default === "object") {
        event = evt.default
        if (!event.listensTo || !event.run) continue
      } else continue

      logger.info(`Registering event ${path.parse(file).base}`)
      this.client.on(evt.listensTo, (...args) => {
        const context = {
          discord: {
            instance: this.client,
            commands: this.commands,
          },
          eventName: evt.listensTo,
          args,
        }
        return evt.run(context)
      })
    }
  }

  static env(): EnvironmentType {
    return (process.env.NODE_ENV as EnvironmentType) || "production"
  }

  static version() {
    return (
      JSON.parse(
        fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf-8")
      ).version || "2.0"
    )
  }
}

const main = new Main()
main.init()

export default main
