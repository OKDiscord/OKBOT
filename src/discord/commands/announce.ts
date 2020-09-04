import { Command } from "../../Main"
import { createDefault, createSimpleMention } from "../../utils/EmbedUtils"
import { shiftMany } from "../../utils/ArrayUtils"
class Announce {
  constructor() {
    return {
      name: "announce",
      description: [
        "Announce dělá to samé co say, ale v embedu.",
        "Jen pro moderátory!",
        "Použití: announce <kanál> <obsah> <název>||(subtitle|content...)",
        "Minimálně jeden řádek!.",
      ],
      run: async (message) => {
        if (!message.member.hasPermission("KICK_MEMBERS"))
          return await message.channel.send(
            createSimpleMention(
              "Chyba",
              "nemáš oprávnění na tento příkaz.",
              message.author
            )
          )

        const content = shiftMany(message.cleanContent.split(" "), 3).join(" ")

        if (!content)
          return await message.channel.send(
            createSimpleMention("Chyba", "nemám co oznámit!", message.author)
          )

        if (message.mentions.channels.size == 0)
          return await message.reply("nezmínil jsi kanál!")

        const embedContent = content.split("||")
        if (embedContent.length < 2)
          return await message.channel.send(
            createSimpleMention("Chyba", "nemám co oznámit!", message.author)
          )

        const title = embedContent[0]
        const text = embedContent[1].split("|")

        if (text.length < 2) return await message.reply("nemám co říct!")

        const embed = createDefault().setTitle(title)

        const fields = text.reduce<Array<[string, string]>>(
          (acc, cur, ind) =>
            ind % 2 === 0
              ? (acc.push([cur, ""]), acc)
              : ((acc[acc.length - 1][1] = cur), acc),
          []
        )

        for (let i = 0; i < fields.length; i++) {
          const poggers = fields[i]
          embed.addField(poggers[0], poggers[1])
        }

        message.mentions.channels.first().send(embed)
      },
    } as Command
  }
}

export default Announce
