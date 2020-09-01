import { Command, logger } from "../../Main"
import { createDefault } from "../../utils/EmbedUtils"
import config from "../../../config"
import { getMongoManager } from "typeorm"
import { createSimple, createSimpleMultiline } from "../../utils/EmbedUtils"
import { WarnProfile } from "../../db/entity/WarnProfile"

class Cw {
  constructor() {
    return {
      name: "cw",
      description:
        "Cw čistí varování uživatele.\nJen pro moderátory!\nPoužití: cw <uživatel>.",
      run: async (message, context) => {
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return await message.reply("nemáš oprávnění na tento příkaz.")
        if (message.mentions.members.size == 0)
          return await message.reply(
            "musíš označit osobu, které chceš vymazat varování."
          )
        const warnProfile = getMongoManager().getMongoRepository(WarnProfile)
        const isThere = await warnProfile.findOne({
          where: { userId: message.mentions.members.first().id },
        })
        if (isThere) {
          isThere.warnings = 0
          await warnProfile.save(isThere)
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
