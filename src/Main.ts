//Libs mad
import * as Discord from "discord.js"
import glob from "glob"
import fs from "fs"
import path from "path"
import config from "../config"

import { connect as connectDb, Mongoose } from "mongoose"
import { createLogger, format, transports } from "winston"
import { Command } from "./types/Command"
import { Event } from "./types/Event"
import { EnvironmentType } from "./types/Misc"
import fastify, { FastifyInstance } from "fastify"
import { IncomingMessage, Server, ServerResponse } from "http"
import fastifyCors from "fastify-cors"
import AnnounceController from "./http/controllers/AnnounceController"
import InfoController from "./http/controllers/InfoController"
import PollController from "./http/controllers/PollController"
import AuthController from "./http/controllers/AuthController"

const loggerFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level}: ${message}`
})

export type DefaultFastify = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
>

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
  db: Mongoose

  server: DefaultFastify = fastify()

  commands: Command[] = []

  constructor() {
    this.client = new Discord.Client()
  }

  async init() {
    logger.info(`OKBOT ${Main.version()}`)
    await this.initDatabase()
    await this.initDiscord()
    await this.initCommands()
    await this.initDiscordEvents()
    await this.initFastify()
  }
  async initDatabase() {
    try {
      this.db = await connectDb(config.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      logger.info("Úspěšně připojeno k databázi.")
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

      const createEvent = <
        E extends keyof Discord.ClientEvents = keyof Discord.ClientEvents
      >(
        evt: Event<E>
      ) => {
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
        createEvent(event)
      }
    })
  }

  async initFastify() {
    this.server.setNotFoundHandler((req, res) =>
      res.send({ success: false, state: "not_found" })
    )
    this.server.register(fastifyCors)
    this.server.register(AuthController)
    this.server.register(InfoController)
    this.server.register(AnnounceController)
    this.server.register(PollController)
    try {
      await this.server.listen(4000, "0.0.0.0")
      logger.info("Fastify úspěšně spuštěno na portu 4000")
    } catch (e) {
      logger.error("Došlo k chybě při spouštění Fastify na portu 4000")
      logger.error(e.message)
    }
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

const main = new Main()
main.init()

export default main
