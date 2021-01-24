import { Fasteer, hookFastify } from "@fasteerjs/fasteer";
import { Client as DClient } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { cfg } from "@okbot/core";
import path from "path";

/**
 * Development Environment?
 */
const dev = process.env.NODE_ENV === "development";

/**
 * Prisma
 */
let db = new PrismaClient();

/**
 * Fasteer
 */
let fasteer: Fasteer.Fasteer;

/**
 * Discord
 */
let discord: DClient;

/**
 * Logger Shorthand
 */
export let logger: Fasteer.Fasteer["logger"];

/**
 * Context Type
 */
export interface Ctx {
  db: typeof db;
  dev: typeof dev;
  discord: typeof discord;
}

export type FCtx = Fasteer.Ctx<Ctx>;

/**
 * Start Server
 */
(async () => {
  /**
   * Discord
   */
  discord = new DClient();
  try {
    await discord.login(cfg.discord.botToken());
  } catch (e) {
    console.log(e);
  }

  /**
   * Fasteer Context
   */
  const ctx: Ctx = {
    db,
    dev,
    discord,
  };

  fasteer = hookFastify({
    controllers: ["ts", "js"].map((ext) =>
      path.join(__dirname, "http", "controllers", `*Controller.${ext}`)
    ),
    port: 4200,
    host: "0.0.0.0",
    cors: {
      origin: dev ? "*" : "https://*.okdiscord.fun",
    },
    helmet: true,
    globalPrefix: "/api",
    development: dev,
    logRequests: true,
    logErrors: true,
    controllerContext: ctx,
  });

  logger = fasteer.getLogger();

  try {
    await fasteer.listen();
  } catch (e) {
    console.log(e);
  }
})();
