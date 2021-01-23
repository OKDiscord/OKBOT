import { makeCommand } from "../../hooks/commands"
import { TextChannel } from "discord.js"
import { createSimpleMention } from "@okbot/core/dist/utils/embedUtils"

export default makeCommand({
  name: "clear",
  description: [
    "Clear čistí chat.",
    "Jen pro moderátory!",
    "Použití: clear <počet do 98>.",
    "PS: Funguje i se znaky :D",
  ],
  run: async (message, { args }) => {
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return await message.channel.send(
        createSimpleMention(
          "Chyba",
          "nemáš oprávnění na tento příkaz.",
          message.author
        )
      )

    if (!args)
      return await message.channel.send(
        createSimpleMention(
          "Chyba",
          "musíš specifikovat číslo!",
          message.author
        )
      )

    const { channel } = message
    const toClear = Number(args[0])

    if (toClear > 100) {
      const howMany = Math.floor(toClear / 100)
      for (let i = 0; i < howMany; i++) {
        await (channel as TextChannel).bulkDelete(100)
      }

      const isRemaining = toClear - howMany * 100
      if (isRemaining >= 1) {
        await (channel as TextChannel).bulkDelete(isRemaining)
      }
    } else {
      await (channel as TextChannel).bulkDelete(Number(toClear))
    }

    const deletedMessage = await message.channel.send(
      createSimpleMention(
        "Úspěch",
        `vyčistil jsem ${Number(args[0])} zpráv.`,
        message.author
      )
    )
    return setTimeout(async () => await deletedMessage.delete(), 5000)
  },
})
