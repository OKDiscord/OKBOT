import { createDefault } from "../../utils/EmbedUtils"
import config from "../../../config"
import { Main, Command, logger } from "../../Main"
import { TextChannel } from "discord.js"
class Clear {
  constructor() {
    return {
      name: "clear",
      description:
        "Clear čistí chat.\nJen pro moderátory!\nPoužití: clear <počet do 98>.\nPS: Funguje i se znaky :D",
      run: async (message, { args }) => {
        if (!message.member.hasPermission("KICK_MEMBERS"))
          return await message.reply("nemáš oprávnění na tento příkaz.")
        if (!args) return await message.reply("potřebuji specifikovat číslo.")
        if (Number(args[0]) > 98)
          return await message.reply("tolik zpráv najednou nemohu vyčistit.")

        const { channel } = message
        ;(channel as TextChannel).bulkDelete(Number(args[0]) + 2)

        const deletedMessage = await message.channel.send(
          `Vyčistil jsem ${Number(args[0])} zpráv.`
        )
        return setTimeout(async () => await deletedMessage.delete(), 5000)
      },
    } as Command
  }
}

export default Clear
