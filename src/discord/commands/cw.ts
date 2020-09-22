import { Command } from "../../types/Command"
import { WarnProfile } from "../../db/EntityManager"

class Cw {
  constructor() {
    return {
      name: "cw",
      description: [
        "Cw čistí varování uživatele.",
        "Jen pro moderátory!",
        "Použití: cw <uživatel>.",
      ],
      run: async (message) => {
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return await message.reply("nemáš oprávnění na tento příkaz.")
        if (message.mentions.members.size == 0)
          return await message.reply(
            "musíš označit osobu, které chceš vymazat varování."
          )
        const isThere = await WarnProfile.findOne({
          userId: message.mentions.members.first().id,
        })
        if (isThere) {
          await isThere.update({ warnings: 0 })
          message.channel.send(
            `<@${message.author.id}> úspěšně vyčistil varování uživateli <@${
              message.mentions.members.first().id
            }>.`
          )
          return
        }
        message.reply("tento uživatel nemá žádná varování!")
      },
    } as Command
  }
}

export default Cw
