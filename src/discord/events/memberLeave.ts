import config from "../../../config"
import { makeEvent } from "../../hooks/events"

export default makeEvent({
  listensTo: "guildMemberRemove",
  run: async ({ args: [member] }) => {
    const {
      guild: { memberCount, channels },
    } = member

    const memberCountChannel = channels.cache.find(
      (channel) => channel.id === config.memberCountChannelId
    )
    if (!memberCountChannel) return false

    return await memberCountChannel.setName(`Member Count: ${memberCount}`)
  },
})
