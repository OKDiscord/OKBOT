import config from "../../../config"
import { makeEvent } from "../../types/Event"

export default makeEvent({
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
})
