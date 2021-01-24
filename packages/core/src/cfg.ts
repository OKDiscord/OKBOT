import { config as environment } from "dotenv";
import path from "path";

let _env: any = null;

const setupEnv = () => {
  const _parsed = environment({ path: path.join(__dirname, "../../../.env") })
    .parsed;
  if (_parsed) _env = { ..._parsed, ...process.env };
};

const fromEnv = (key: string) => {
  if (!_env) setupEnv();
  return _env[key];
};

const _cfg = require("../../../config.json");
const _pkg = require("../../../package.json");

interface JsonConfig {
  discord: {
    roles: {
      mute: string;
      webAccess: string;
    };
    channels: {
      memberCount: string;
    };
    guildId: string;
    prefix: string;
  };
}

/**
 * Environment
 */
const env = {
  isDev: () => fromEnv("NODE_ENV") === "development",
  isProd: () => fromEnv("NODE_ENV") !== "development",
};

/**
 * REST API
 */
const rest = {
  restPort: () => (fromEnv("REST_PORT") ? Number(fromEnv("REST_PORT")) : 4000),
  jwtSecret: () => {
    if (!fromEnv("JWT_SECRET")) console.error("JWT_SECRET IS NOT SET!");

    return fromEnv("JWT_SECRET") ?? "okb0tdev__jwt__dontstealourhardwork";
  },
};

/**
 * Database
 */
const database = () =>
  fromEnv("DB_URL") ?? "mongodb://admin:pass@domain.tld/okbot";

/**
 * Discord
 */
const discord = {
  botToken: () => fromEnv("BOT_TOKEN"),
  clientSecret: () => fromEnv("BOT_SECRET"),
  oauthUrl: () => fromEnv("DISCORD_OAUTH_URL"),
  ...(_cfg as JsonConfig).discord,
};

const botVersion = _pkg.version;

export { env, rest, database, discord, botVersion, setupEnv, fromEnv };
export default { env, rest, database, discord, botVersion, setupEnv, fromEnv };
