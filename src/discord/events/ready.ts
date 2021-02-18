import config from "../../../config"
import { makeEvent } from "../../hooks/events"

export default makeEvent({
  listensTo: "ready",
  run: async ({ client }) => {
    const guild = client.guilds.cache.find(
      (guild) => guild.id === config.guildId
    )

    if (!guild) return false

    const memberCountChannel = guild.channels.cache.find(
      (channel) => channel.id === config.memberCountChannelId
    )

    if (!memberCountChannel) return false

    return await memberCountChannel.setName(
      `Member Count: ${guild.memberCount}`
    )
  },
})
