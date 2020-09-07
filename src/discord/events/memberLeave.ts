import config from "../../../config"
import { Event } from "../../types/Event"

class MemberLeave {
  constructor() {
    return {
      listensTo: "guildMemberRemove",
      run: async (context) => {
        const {
          guild: { memberCount, channels },
        } = context.args[0]

        const memberCountChannel = channels.cache.find(
          (channel) => channel.id === config.memberCountChannelId
        )
        if (!memberCountChannel) return false

        return await memberCountChannel.setName(`Member Count: ${memberCount}`)
      },
    } as Event<"guildMemberRemove">
  }
}

export default MemberLeave
