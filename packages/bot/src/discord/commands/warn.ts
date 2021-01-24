import { makeCommand } from "../../hooks/commands"
import { createSimpleMultiline } from "@okbot/core/dist/utils/embedUtils"

export default makeCommand({
  name: "warn",
  description: [
    "Warn varuje uživatele.",
    "Po třech varováních ho automaticky vyhodí.",
    "Jen pro moderátory!",
    "Použití: warn <uživatel>.",
  ],
  run: async (message, { args: [, reason], db: { punishment } }) => {
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return await message.reply("nemáš oprávnění na tento příkaz.")

    if (message.mentions.everyone)
      return await message.reply("nemůžeš varovat všechny.")

    if (message.mentions.members.size === 0)
      return await message.reply("musíš označit osobu, kterou chceš varovat!")

    if (message.mentions.members.first().id == message.guild.me.id)
      return await message.reply("sám sebe nedokážu varovat!")

    const toWarn = message.mentions.members.first()
    const punishmentCount = await punishment.count({
      where: { punished: toWarn.id, kind: "warn" },
    })

    if (punishmentCount >= 3) {
      const embed = toWarn.kickable
        ? createSimpleMultiline(`Warning Kick | ${toWarn.user.username}`, [
            `${toWarn.user.username} byl/a kicknut/a za 3 a více varování!`,
            "",
            `Moderátor zodpovědný za poslední warn: ${message.author.id}`,
          ])
        : createSimpleMultiline(
            `Warning Kick Error | ${toWarn.user.username}`,
            [`${toWarn.user.username} má 3+ varování, ale nemohu ho kicknout.`]
          )

      if (toWarn.kickable) await toWarn.kick(reason)

      await message.channel.send(embed)
      return await punishment.deleteMany({
        where: { punished: toWarn.id, kind: "warn" },
      })
    }

    await punishment.create({
      data: { kind: "warn", reason, punished: toWarn.id },
    })

    const embed = createSimpleMultiline(`Warning | ${toWarn.user.username}`, [
      `${toWarn.user.username} byl/a úspěšně varován/a!`,
      "",
      `Zodpovědný moderátor: <@${message.author.id}>`,
      `Počet varování: ${punishmentCount + 1}`,
    ])

    await message.channel.send(embed)
  },
})
