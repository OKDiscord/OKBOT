import { TextChannel } from "discord.js"
import { createDefault } from "../../utils/embedUtils"
import { Fasteer } from "@fasteerjs/fasteer"

const AnnounceController: Fasteer.FCtrl = async (
  server,
  { ctx: { discord } }
) => {
  server.post<any>("/", async (req, res) => {
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
}

export const routePrefix = "/announce"
export default AnnounceController
