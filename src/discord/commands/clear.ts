import { Command } from "../../types/Command"
import { TextChannel } from "discord.js"
import { createSimple } from "../../utils/EmbedUtils"
class Clear {
  constructor() {
    return {
      name: "clear",
      description: [
        "Clear čistí chat.",
        "Jen pro moderátory!",
        "Použití: clear <počet do 98>.",
        "PS: Funguje i se znaky :D",
      ],
      run: async (message, { args }) => {
        if (!message.member.hasPermission("KICK_MEMBERS"))
          return await message.reply("nemáš oprávnění na tento příkaz.")
        if (!args) return await message.reply("potřebuji specifikovat číslo.")
        if (Number(args[0]) > 98)
          return await message.reply("tolik zpráv najednou nemohu vyčistit.")

        const { channel } = message
        ;(channel as TextChannel).bulkDelete(Number(args[0]) + 2)

        const deletedMessage = await message.channel.send(
          createSimple("Úspěch", `Vyčistil jsem ${Number(args[0])} zpráv.`)
        )
        return setTimeout(async () => await deletedMessage.delete(), 5000)
      },
    } as Command
  }
}

export default Clear
