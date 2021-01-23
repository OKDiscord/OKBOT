import { logger } from "../.."
import { makeCommand } from "../../hooks/commands"
import { createSimple } from "../../utils/embedUtils"

export default makeCommand({
  name: "weeb",
  description: "Command kterej vyšle Japanizing beam!",
  run: async (message) => {
    const allowed = ["464857021603250197", "630439552389218313"]
    if (allowed.includes(message.author.id)) {
      await message.channel.send(
        createSimple(
          "Posílám Japanizing beam",
          "Připravte se na přeměnu na weeby!"
        )
      )
      for (const member of message.guild.members.cache.array()) {
        try {
          if (member.nickname !== "ultra weeb") {
            await member.setNickname("ultra weeb")
          }
        } catch (error) {
          logger.warn(
            `Chyba při přejmenování ${member.user.username} - `,
            error.message
          )
        }
      }
      return await message.channel.send(
        createSimple(
          "Vítejte, weebové!",
          "Doufáme, že se vám zde bude líbít! @everyone"
        )
      )
    }

    return await message.reply(
      "nejsi Simír ani Vottus! Nemůžeš poslat japanizing beam!"
    )
  },
})
