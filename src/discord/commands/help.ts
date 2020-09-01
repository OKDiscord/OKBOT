import { createDefault } from "../../utils/EmbedUtils"
import config from "../../../config"
import { Command } from "../../Main"
class Help {
  constructor() {
    return {
      name: "help",
      description: "Help vypíše všechny dostupné příkazy.\nPoužití: help.",
      run: async (message, { discord: { commands } }) => {
        const helpEmbed = createDefault().setTitle("Help")

        for (const command of commands as Command[]) {
          helpEmbed.addField(
            `${config.prefix}${command.name}`,
            command.description || "Žádný popis"
          )
        }

        return await message.channel.send(helpEmbed)
      },
    } as Command
  }
}

export default Help
