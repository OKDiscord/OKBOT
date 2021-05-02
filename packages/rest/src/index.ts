import { hookFastify } from "@fasteerjs/fasteer";
import { Client as DClient } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { cfg } from "@okbot/core/src";
import { Injected } from "./types";
import path from "path";
import { FastifyReply } from "fastify";
import fastifySession from "fastify-secure-session";
import { createExceptionHandler } from "@fasteerjs/exceptions";
import fs from "fs";

const __DEV__ = process.env.NODE_ENV === "development";

const db = new PrismaClient();

const app = hookFastify({
  controllers: ["ts", "js"].map((ext) =>
    path.join(__dirname, "http", "controllers", `*Controller.${ext}`)
  ),
  port: 4200,
  host: "0.0.0.0",
  cors: {
    origin: __DEV__ ? "*" : "https://*.okdiscord.fun",
  },
  helmet: true,
  globalPrefix: "/api",
  development: __DEV__,
  logRequests: true,
  logErrors: true,
  errorHandler: createExceptionHandler({}),
});

const discord = new DClient();

(async () => {
  try {
    await discord.login(cfg.discord.botToken());
    app.logger.info("Connected to Discord.");
  } catch (e) {
    console.log(e);
  }

  app.inject<Injected>({
    db,
    dev: __DEV__,
    discord,
  });

  app.fastify.register(fastifySession, {
    cookieName: "okbot_session",
    key: fs.readFileSync(path.join(__dirname, "..", "..", "session-key.local")),
    cookie: {
      path: "/",
    },
  });

  app.fastify.decorateReply("ok", ((data) => ({
    success: true,
    data,
  })) as FastifyReply["ok"]);

  app.fastify.decorateReply("err", ((error) => ({
    success: false,
    error,
  })) as FastifyReply["err"]);

  try {
    await app.start();
    app.logger.info("Fasteer started.");
  } catch (e) {
    console.log(e);
  }
})();
