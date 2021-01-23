import { hookFastify } from "@fasteerjs/fasteer";
import path from "path";

const dev = process.env.NODE_ENV === "development";

const ctx = {};

export type Ctx = typeof ctx;

const fasteer = hookFastify({
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

export const logger = fasteer.getLogger();

(async () => {
  try {
    await fasteer.listen();
  } catch (e) {
    console.log(e);
  }
})();
