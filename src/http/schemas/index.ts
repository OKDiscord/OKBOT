import { RouteGenericInterface } from "fastify/types/route"

/**
 * =========================================
 *
 * --------------------------
 * Generic Schemas
 * --------------------------
 *
 * Schema for generic endpoints
 *
 * =========================================
 */

/**
 * --------------------------
 * AnnounceSchema
 * --------------------------
 *
 * Schema for the /announce endpoint
 *
 */
interface AnnounceSchema extends RouteGenericInterface {
  Body: {
    title: string
    fields: { name: string; value: string }[]
    channel: string
  }
}

const announceSchema = {
  body: {
    title: { type: "string" },
    fields: { type: "array" },
    channel: { type: "string" },
  },
}

/**
 * --------------------------
 * PollSchema
 * --------------------------
 *
 * Schema for the /poll endpoint
 *
 */

interface PollSchema extends RouteGenericInterface {
  Body: {
    channel: string
    question: string
    answers: string[]
  }
}

const pollSchema = {
  body: {
    channel: { type: "string" },
    question: { type: "string" },
    answers: { type: "array" },
  },
}

/**
 * =========================================
 *
 * --------------------------
 * Auth Schemas
 * --------------------------
 *
 * Schema for the /auth endpoints
 *
 * =========================================
 */

/**
 * --------------------------
 * LoginSchema
 * --------------------------

 * Schema for the /auth/login endpoint
 *
 */
interface LoginSchema extends RouteGenericInterface {
  Body: {
    username: string
    password: string
  }
}

const loginSchema = {
  body: {
    username: { type: "string" },
    password: { type: "string" },
  },
}

/**
 * --------------------------
 * DiscordAuthorizeSchema
 * --------------------------

 * Schema for the /auth/discord-authorize endpoint
 *
 */

interface DiscordAuthorizeSchema extends RouteGenericInterface {
  Body: {
    code: string
  }
}

const discordAuthorizeSchema = {
  body: {
    code: { type: "string" },
  },
}

export {
  /** -- Generic Schemas -- */

  // PollSchema
  PollSchema,
  pollSchema,
  // AnnounceSchema
  AnnounceSchema,
  announceSchema,
  /** -- Auth Schemas -- */

  // LoginSchema
  LoginSchema,
  loginSchema,
  // DiscordAuthorizeSchema
  DiscordAuthorizeSchema,
  discordAuthorizeSchema,
}
