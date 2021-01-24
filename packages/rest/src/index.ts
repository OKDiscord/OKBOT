import { Fasteer, hookFastify } from "@fasteerjs/fasteer";
import { Mongoose } from "mongoose";
import connectDatabase from "@okbot/core/dist/db/connectDatabase";
import path from "path";

/**
 * Development Environment?
 */
const dev = process.env.NODE_ENV === "development";

/**
 * MongoDB
 */
let db: Mongoose;

/**
 * Fasteer
 */
let fasteer: Fasteer.Fasteer;

/**
 * Logger Shorthand
 */
export let logger: Fasteer.Fasteer["logger"];

/**
 * Context Type
 */
export type Ctx = {
  db: typeof db;
  dev: typeof dev;
};

/**
 * Start Server
 */
(async () => {
  try {
    db = await connectDatabase();
  } catch (e) {
    console.log(e);
  }

  /**
   * Fasteer Context
   */
  const ctx: Ctx = {
    db,
    dev,
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
