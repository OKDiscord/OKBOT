import { cfg } from "@okbot/core"
import { makeEvent } from "../../hooks/events"

export default makeEvent({
  listensTo: "presenceUpdate",
  run: async ({ args: [newPresence], client }) => {
    if (!newPresence.activities || newPresence.activities.length === 0) {
      return await client.user.setPresence({
        activity: { name: `${cfg.discord.prefix}help` },
        status: "online",
      })
    }
  },
})
