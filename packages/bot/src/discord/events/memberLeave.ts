import { cfg } from "@okbot/core"
import { makeEvent } from "../../hooks/events"

export default makeEvent({
  listensTo: "guildMemberRemove",
  run: async (context) => {
    const {
      guild: { memberCount, channels },
    } = context.args[0]

    const memberCountChannel = channels.cache.find(
      (channel) => channel.id === cfg.discord.channels.memberCount
    )
    if (!memberCountChannel) return false

    return await memberCountChannel.setName(`Member Count: ${memberCount}`)
  },
})
