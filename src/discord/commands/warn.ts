import { WarnProfile } from "../../db/EntityManager"
import { Command } from "../../types/Command"
import { createSimpleMultiline } from "../../utils/EmbedUtils"

class Warn {
  constructor() {
    return {
      name: "warn",
      description: [
        "Warn varuje uživatele.",
        "Po třech varováních ho automaticky vyhodí.",
        "Jen pro moderátory!",
        "Použití: warn <uživatel>.",
      ],
      run: async (message) => {
        if (!message.member.hasPermission("KICK_MEMBERS"))
          return await message.reply("nemáš oprávnění na tento příkaz.")

        if (message.mentions.everyone)
          return await message.reply("nemůžeš varovat všechny.")

        if (message.mentions.members.size === 0)
          return await message.reply(
            "musíš označit osobu, kterou chceš varovat!"
          )

        if (message.mentions.members.first().id == message.guild.me.id)
          return await message.reply("sám sebe nedokážu varovat!")

        const toWarn = message.mentions.members.first()
        const isThere = await WarnProfile.findOne({
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
            await isThere.update({ warnings: 0 })
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
          await isThere.update({ warnings: isThere.warnings + 1 })
          //   message.channel.send(`<@${toWarn.id}> byl/a úspěšně varován/a!\nZodpovědný moderátor: <@${message.author.id}>!\nPočet varování: ${isThere.warnings}`)
          const embed = createSimpleMultiline(
            `Warning | ${toWarn.user.username}`,
            [
              `${toWarn.user.username} byl/a úspěšně varován/a!`,
              "",
              `Zodpovědný moderátor: <@${message.author.id}>`,
              `Počet varování: ${isThere.warnings}`,
            ]
          )
          await message.channel.send(embed)
        } else {
          await WarnProfile.create({
            userId: toWarn.id,
            warnings: 1,
          })
          const embed = createSimpleMultiline(
            `Warning | ${toWarn.user.username}`,
            [
              `${toWarn.user.username} byl/a úspěšně varován/a!`,
              "",
              `Zodpovědný moderátor: <@${message.author.id}>`,
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
