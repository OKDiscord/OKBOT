import fp from "fastify-plugin"
import { DefaultFastify } from "../../Main"
import * as AS from "../schemas/AnnounceSchema"

export default fp(
  (server: DefaultFastify, options: unknown, next: () => unknown) => {
    // server.post<AS.AnnounceSchema>(
    //   "/announce",
    //   { schema: AS.announceSchema },
    //   (req, res) => {}
    // ) TODO: complete

    next()
  }
)
