import { makeCommand } from "../../hooks/commands"
import {
  createDefault,
  createSimpleMention,
  createSimpleMultilineMention,
} from "../../utils/embedUtils"
import { shiftMany } from "../../utils/arrayUtils"

export default makeCommand({
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

    if (text.length < 2)
      return await message.channel.send(
        createSimpleMention("Chyba", "nemám co oznámit!", message.author)
      )

    const embed = createDefault().setTitle(title)

    const fields = text.reduce<Array<[string, string]>>(
      (acc, cur, ind) =>
        ind % 2 === 0
          ? (acc.push([cur, ""]), acc)
          : ((acc[acc.length - 1][1] = cur), acc),
      []
    )

    for (const field of fields) {
      if (!field[0] || field[0] === "" || !field[1] || field[1] === "") {
        return await message.channel.send(
          createSimpleMultilineMention(
            "Chyba",
            ["špatně jsi použil příkaz!", "Jeden z podtitulků/textů chybí!"],
            message.author
          )
        )
      }
      embed.addField(field[0], field[1])
    }

    return await message.mentions.channels.first().send(embed)
  },
})
