import { createDefault } from "@okbot/core/dist/utils/embedUtils"
import { cfg } from "@okbot/core"
import { makeCommand } from "../../hooks/commands"

export default makeCommand({
  name: "help",
  description: ["Help vypíše všechny dostupné příkazy.", "Použití: help."],
  run: async (message, { commands }) => {
    const helpEmbed = createDefault().setTitle("Help")

    for (const command of commands) {
      const { array: roleCache } = message.member.roles.cache

      let allowed = true

      if (command.permissible) {
        const { roles, all } = command.permissible

        allowed = all
          ? roleCache().every((item) => roles.includes(item.id))
          : roleCache().some((item) => roles.includes(item.id))
      }

      if (allowed)
        helpEmbed.addField(
          `${cfg.discord.prefix}${command.name}`,
          command.description || "Žádný popis"
        )
    }

    return await message.channel.send(helpEmbed)
  },
})
