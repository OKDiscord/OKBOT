import { TextChannel } from "discord.js"
import { removeKeys, shallowClone } from "../../utils/objectUtils"
import { Fasteer } from "@fasteerjs/fasteer"

const InfoController: Fasteer.FCtrl = async (server, { ctx: { discord } }) => {
  server.get("/channels", (req, res) => {
    const channels = discord.channels.cache
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
}

export default InfoController
