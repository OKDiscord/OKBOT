import config from "../../../config"
import { Event } from "../../types/Event"

class Presence {
  constructor() {
    return {
      listensTo: "presenceUpdate",
      run: async (context) => {
        const newPresence = context.args[1]
        if (!newPresence.activities || newPresence.activities.length === 0) {
          return await context.discord.instance.user.setPresence({
            activity: { name: `${config.prefix}help` },
            status: "online",
          })
        }
      },
    } as Event<"presenceUpdate">
  }
}

export default Presence
