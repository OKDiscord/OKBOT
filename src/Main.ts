//Libs mad
import * as Discord from "discord.js"
import { createConnection, Connection } from "typeorm"
import glob from "glob"
import fs from "fs"
import path from "path"
import config from "../config"

import { createLogger, format, transports } from "winston"
import { Command } from "./types/Command"
import { Event } from "./types/Event"
import { EnvironmentType } from "./types/Misc"

const loggerFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level}: ${message}`
})

export const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        loggerFormat
      ),
      handleExceptions: true,
    }),
    new transports.File({
      format: format.combine(format.timestamp(), loggerFormat),
      filename: path.join(__dirname, "..", "logs", "combined.log"),
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, "..", "logs", "exceptions.log"),
    }),
  ],
})

//Main
export class Main {
  // Variables
  client: Discord.Client
  db: Connection

  commands: Command[] = []

  testing: boolean

  constructor(testing?: boolean) {
    this.client = new Discord.Client()
    this.testing = testing || false
  }

  async init() {
    logger.info(`OKBOT ${Main.version()}`)
    await this.initDatabase()
    await this.initDiscord()
    await this.initCommands()
    await this.initDiscordEvents()
  }
  async initDatabase() {
    try {
      this.db = await createConnection({
        type: "mongodb",
        url: config.mongoUri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        entities: [path.join(__dirname, "db", "entity", "*.ts")],
      })
      !this.testing && logger.info("Úspěšně připojeno k databázi.")
    } catch (e) {
      logger.error("Stala se chyba během připojování k databázi.")
      logger.error(e.message)
      process.exit(1)
    }
  }

  async initDiscord() {
    try {
      await this.client.login(config.token)
      this.client.user.setPresence({
        activity: { name: `${config.prefix}help` },
        status: "online",
      })
      const {
        user: { username, discriminator },
      } = this.client
      !this.testing &&
        logger.info(
          `Úspěšně přihlášen na Discord jako ${username}#${discriminator}`
        )
    } catch (e) {
      logger.error("Stala se chyba během přihlašování.")
      logger.error(e)
      process.exit(1)
    }
  }

  async initCommands() {
    const commandsPath = path.join(__dirname, "discord", "commands", "*.ts")
    await glob(commandsPath, async (e, files) => {
      if (e) {
        logger.error("Nelze načíst příkazy.")
        logger.error(e)
        process.exit(1)
      }

      for (const file of files) {
        const cmd = await import(file)
        if (typeof cmd.default === "function") {
          const command: Command = cmd.default()
          if (command.description) {
            if (command.description instanceof Array) {
              command.description = (command.description as Array<string>).join(
                "\n"
              )
            }
          }
          this.commands.push(command)
        }
      }
    })
  }

  async initDiscordEvents() {
    const eventsPath = path.join(__dirname, "discord", "events", "*.ts")
    await glob(eventsPath, async (e, files) => {
      if (e) {
        logger.error("Nelze načíst eventy.")
        logger.error(e)
        process.exit(1)
      }

      for (const file of files) {
        const evt = await import(file)
        if (typeof evt.default === "function") {
          const event: Event<keyof Discord.ClientEvents> = evt.default()
          this.client.on(event.listensTo, (...args) => {
            const context = {
              discord: {
                instance: this.client,
                commands: this.commands,
              },
              eventName: event.listensTo,
              args,
            }
            return event.run(context)
          })
        }
      }
    })
  }

  static env() {
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

const main = new Main(false)
main.init()

export default main
