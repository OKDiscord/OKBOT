import { TextChannel } from "discord.js"
import fp from "fastify-plugin"
import main, { DefaultFastify } from "../../Main"
import { removeKeys, shallowClone } from "../../utils/ObjectUtils"

export default fp(
  (server: DefaultFastify, options: unknown, next: () => unknown) => {
    server.get("/channels", (req, res) => {
      const channels = main.client.channels.cache
        .filter((e) => e.type === "text")
        .map((e) =>
          removeKeys(shallowClone(e) as TextChannel, [
            "type",
            "deleted",
            "rawPosition",
            "parentID",
            "permissionOverwrites",
            "topic",
            "lastMessageID",
            "rateLimitPerUser",
            "lastPinTimestamp",
            "guild",
            "messages",
            "createdTimestamp",
            "_typing",
          ])
        )
      res.send({
        success: true,
        channels,
      })
    })

    next()
  }
)
