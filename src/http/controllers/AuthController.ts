/* eslint-disable camelcase */
import fp from "fastify-plugin"
import { User } from "../../db/EntityManager"
import { DefaultFastify } from "../../Main"
import {
  loginSchema as login,
  LoginSchema,
  discordAuthorizeSchema as discordAuth,
  DiscordAuthorizeSchema as DiscordAuth,
} from "../schemas"
import * as argon2 from "argon2"
import Jwt from "../helpers/Jwt"
import config from "../../../config"
import Axios from "axios"
import queryString from "querystring"
import main from "../../Main"

export default fp(
  (server: DefaultFastify, options: unknown, next: () => unknown) => {
    server.post<LoginSchema>(
      "/auth/login",
      { schema: login },
      async ({ body: { username, password } }, res) => {
        const user = await User.findOne({ username: username })
        if (!user)
          return await res
            .status(401)
            .send({ success: false, state: "invalid_login_username" })

        const isPassword = await argon2.verify(user.password, password)

        if (!isPassword)
          return await res
            .status(401)
            .send({ success: false, state: "invalid_login_password" })

        const token = Jwt.sign({ userId: user.id })
        return await res.send({ success: true, state: "provided", token })
      }
    )

    server.get("/auth/discord-oauth", async (_, res) => {
      return await res.send({
        success: true,
        state: "provided",
        url: config.discordOAuthUrl,
      })
    })

    // TODO: complete
    server.post<DiscordAuth>(
      "/auth/discord-authorize",
      { schema: discordAuth },
      async (req, res) => {
        const { code } = req.body

        // FIXME: fix the shit below

        const { data } = await Axios.request({
          url: "https://discord.com/api/v6/oauth2/token",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: queryString.encode({
            client_id: "718157922336768021",
            client_secret: config.discord.clientSecret,
            grant_type: "authorization_code",
            code,
            scope: "identify guilds",
            redirect_uri: "http://89.176.241.227:8080/bot-authorize",
          }),
        })
        // console.log(data)

        if (typeof data.error === "string") {
          let error = "unknown"
          switch (data.error_description) {
            case 'Invalid "code" in request.':
              error = "invalid_code"
              break
            default:
              error = "unknown"
              break
          }

          return await res
            .status(400)
            .send({ success: false, state: `err_${error}` })
        }

        const me = await Axios.request({
          method: "GET",
          url: "https://discord.com/api/v6/users/@me",
          headers: { Authorization: `Bearer ${data.access_token}` },
        })

        if (!me) return // error: cant obtain id

        const guild = main.client.guilds.cache.find(
          (el) => el.id === config.guildId
        )
        if (!guild) return // error: bot not on server

        const hasUser = guild.members.cache
          .array()
          .some((el) => el.id === me.id)
        if (!hasUser) return // error: user not on server

        return await res.send({
          success: false,
          message: "not_implemented_yet",
        })
      }
    )

    next()
  }
)
