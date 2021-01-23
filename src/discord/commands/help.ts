import { createDefault } from "../../utils/EmbedUtils"
import config from "../../../config"
import { Command, makeCommand } from "../../types/Command"

export default makeCommand({
  name: "help",
  description: ["Help vypíše všechny dostupné příkazy.", "Použití: help."],
  run: async (message, { discord: { commands } }) => {
    const helpEmbed = createDefault().setTitle("Help")

    for (const command of commands as Command[]) {
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
          `${config.prefix}${command.name}`,
          command.description || "Žádný popis"
        )
    }

    return await message.channel.send(helpEmbed)
  },
})
