import fp from "fastify-plugin"
import main, { DefaultFastify } from "../../Main"
import * as PS from "../schemas/PollSchema"
import { TextChannel } from "discord.js"
import { sendPoll } from "../../common/sendPoll"

export default fp(
  (server: DefaultFastify, options: unknown, next: () => unknown) => {
    const { client: discord } = main

    server.post<PS.PollSchema>(
      "/poll",
      { schema: PS.pollSchema },
      async (req, res) => {
        const { channel: channelId, question, answers } = req.body

        const channel = discord.channels.cache.find(
          (c) => c.id === channelId
        ) as TextChannel

        if (!channel)
          res.status(400).send({ success: false, state: "channel not found" })

        await sendPoll(channel, question, answers)

        return res.send({ success: true, state: "message sent" })
      }
    )

    next()
  }
)
