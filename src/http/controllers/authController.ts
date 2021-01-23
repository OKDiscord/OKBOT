import { User } from "../../db/EntityManager"
import * as argon2 from "argon2"
import Jwt from "../helpers/jwt"
import config from "../../../config"

import { successRes, errorRes } from "@vottuscode/response-spec/dist/fastify"
import { Fasteer } from "@fasteerjs/fasteer"
import { Auth } from "../schemas"

const AuthController: Fasteer.FCtrl = async (server) => {
  server.post<Auth.LoginSchema>(
    "/login",
    async ({ body: { username, password } }, res) => {
      const user = await User.findOne({ username })
      if (!user)
        return errorRes(
          {
            message: "Incorrect credentials",
            kind: "user_input",
          },
          res
        )

      if (!(await argon2.verify(user.password, password)))
        return errorRes(
          {
            message: "Incorrect credentials",
            kind: "user_input",
          },
          res
        )

      return successRes({ token: Jwt.sign({ userId: user.id }) }, res)
    }
  )

  server.get("/discord-oauth", async (_, res) =>
    successRes({ url: config.discordOAuthUrl }, res)
  )

  server.post<Auth.DiscordAuthSchema>("/discord-authorize", async (_, res) =>
    errorRes(
      {
        message: "This endpoint is not implemented yet",
        kind: "not_implemented",
      },
      res
    )
  )
}

export const routePrefix = "/auth"
export default AuthController
