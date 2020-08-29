import { MessageEmbed } from "discord.js"
import config from "../../../config"
import { Main, Command } from "../../main"
class Help {
  constructor() {
    return {
      name: "help",
      description: "Help vypíše všechny dostupné příkazy.",
      run: async (message, { discord: { commands } }) => {
        const helpEmbed = new MessageEmbed()
          .setTitle("Help")
          .setColor("#b23bf0")
          .setFooter(`OKBOT v${Main.version()} | By Simír Gerchán & Vottus`)

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
