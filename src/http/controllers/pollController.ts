import { TextChannel } from "discord.js"
import { sendPoll } from "../../hooks/polls/sendPoll"
import { Fasteer } from "@fasteerjs/fasteer"

const PollController: Fasteer.FCtrl = async (server, { ctx: { discord } }) => {
  server.post<any>("/", async (req, res) => {
    const { channel: channelId, question, answers } = req.body

    const channel = discord.channels.cache.find(
      (c) => c.id === channelId
    ) as TextChannel

    if (!channel)
      res.status(400).send({ success: false, state: "channel not found" })

    await sendPoll(channel, question, answers)

    return res.send({ success: true, state: "message sent" })
  })
}

export const routePrefix = "/poll"
export default PollController
