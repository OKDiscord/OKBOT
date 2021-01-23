import { logger } from "@typegoose/typegoose/lib/logSettings"
import { makeCommand } from "../../hooks/commands"
import { createSimple } from "../../utils/embedUtils"

export default makeCommand({
  name: "unweeb",
  description: "Command kterej ze všech zase udělá normies, ty nudný :/",
  run: async (message) => {
    const allowed = ["464857021603250197", "630439552389218313"]
    if (allowed.includes(message.author.id)) {
      await message.channel.send(
        createSimple("Pracuju..", "Připravte se na přeměnu na normies!")
      )
      for (const member of message.guild.members.cache.array()) {
        try {
          if (member.nickname === "ultra weeb") {
            await member.setNickname(member.user.username)
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
          "Vítejte, normies!",
          "Doufáme, že se znovu stanete weeby! @everyone"
        )
      )
    }

    return await message.reply(
      "nejsi Simír ani Vottus! Nemůžeš dělat z lidí normies!"
    )
  },
})
