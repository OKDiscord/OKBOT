import fp from "fastify-plugin"
import main, { DefaultFastify } from "../../Main"
import { announceSchema as schema, AnnounceSchema } from "../schemas"
import { TextChannel } from "discord.js"
import { createDefault } from "../../utils/EmbedUtils"

export default fp(
  (server: DefaultFastify, options: unknown, next: () => unknown) => {
    const { client: discord } = main

    server.post<AnnounceSchema>("/announce", { schema }, async (req, res) => {
      const { channel: channelId, title, fields } = req.body

      const channel = discord.channels.cache.find(
        (c) => c.id === channelId
      ) as TextChannel
      if (!channel)
        res.status(400).send({ success: false, state: "channel not found" })

      const embed = createDefault().setTitle(title)
      embed.addFields(fields)

      await channel.send(embed)

      res.send({ success: true, state: "message sent" })
    })

    next()
  }
)
