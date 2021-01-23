// @ts-ignore
import _cfg from "../../../config.json";
// @ts-ignore
import _pkg from "../../../package.json";

const _env = process.env;

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
  isDev: () => _env.NODE_ENV === "development",
  isProd: () => _env.NODE_ENV !== "development",
};

/**
 * REST API
 */
const rest = {
  restPort: () => (_env.REST_PORT ? Number(_env.REST_PORT) : 4000),
  jwtSecret: () => {
    if (!_env.JWT_SECRET) console.error("JWT_SECRET IS NOT SET!");

    return _env.JWT_SECRET ?? "okb0tdev__jwt__dontstealourhardwork";
  },
};

/**
 * Database
 */
const database = () => _env.DB_URL ?? "mongodb://admin:pass@domain.tld/okbot";

/**
 * Discord
 */
const discord = {
  botToken: () => _env.BOT_TOKEN,
  clientSecret: () => _env.BOT_SECRET,
  oauthUrl: () => _env.DISCORD_OAUTH_URL,
  ...(_cfg as JsonConfig).discord,
};

const botVersion = _pkg.version;

export { env, rest, database, discord, botVersion };
export default { env, rest, database, discord, botVersion };
