import { WarnProfile } from "../../db/entity/WarnProfile"
import { Command } from "../../Main"
import { getMongoManager } from "typeorm"
import { createSimple, createSimpleMultiline } from "../../utils/EmbedUtils"

class Warn {
  constructor() {
    return {
      name: "warn",
      description:
        "Warn varuje uživatele.\nPo třech varováních ho automaticky vyhodí.\nJen pro moderátory!",
      run: async (message, context) => {
        if (!message.member.hasPermission("KICK_MEMBERS"))
          return message.reply("nemáš oprávnění na tento příkaz.")

        if (message.mentions.everyone)
          return message.reply("nemůžeš varovat všechny.")

        if (message.mentions.members.size === 0)
          return message.reply("musíš označit osobu kterou chceš varovat!")

        if (message.mentions.members.first().id == message.guild.me.id)
          return message.reply("já se sám nedokážu varovat!")

        const toWarn = message.mentions.members.first()
        const warnProfile = getMongoManager().getMongoRepository(WarnProfile)
        const isThere = await warnProfile.findOne({
          where: { userId: toWarn.id },
        })
        if (isThere) {
          if (isThere.warnings >= 3 && toWarn.kickable) {
            const embed = createSimpleMultiline(
              `Warning Kick | ${toWarn.user.username}`,
              [
                `${toWarn.user.username} byl/a kicknut/a za 3 a více varování!`,
                "",
                `Moderátor zodpovědný za poslední warn: ${message.author.id}`,
              ]
            )
            await message.channel.send(embed)
            isThere.warnings = 0
            await warnProfile.save(isThere)
            return
          } else if (isThere.warnings >= 3) {
            const embed = createSimpleMultiline(
              `Warning Kick Error | ${toWarn.user.username}`,
              [
                `${toWarn.user.username} má 3+ varování, ale nemohu ho kicknout.`,
              ]
            )
            return await message.channel.send(embed)
          }
          isThere.warnings = isThere.warnings + 1
          await warnProfile.save(isThere)
          //   message.channel.send(`<@${toWarn.id}> byl/a úspěšně varován/a!\nZodpovědný moderátor: <@${message.author.id}>!\nPočet varování: ${isThere.warnings}`)
          const embed = createSimpleMultiline(
            `Warning | ${toWarn.user.username}`,
            [
              `${toWarn.user.username} byl/a úspěšně varován/a!`,
              "",
              `Zodpovědný moderátor: ${message.author.id}`,
              `Počet varování: ${isThere.warnings}`,
            ]
          )
          await message.channel.send(embed)
        } else {
          const newWarn = warnProfile.create({ userId: toWarn.id, warnings: 1 })
          await warnProfile.save(newWarn)
          const embed = createSimpleMultiline(
            `Warning | ${toWarn.user.username}`,
            [
              `${toWarn.user.username} byl/a úspěšně varován/a!`,
              "",
              `Zodpovědný moderátor: ${message.author.id}`,
              `Počet varování: 1`,
            ]
          )
          await message.channel.send(embed)
        }
      },
    } as Command
  }
}

export default Warn
