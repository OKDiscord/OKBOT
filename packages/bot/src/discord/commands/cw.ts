import { makeCommand } from "../../hooks/commands"
import { asMention } from "@okbot/core/dist/utils/discordUtils"

export default makeCommand({
  name: "cw",
  description: [
    "Cw čistí varování uživatele.",
    "Jen pro moderátory!",
    "Použití: cw <uživatel>.",
  ],
  run: async (message, { db }) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return await message.reply("nemáš oprávnění na tento příkaz.")
    if (message.mentions.members.size == 0)
      return await message.reply(
        "musíš označit osobu, které chceš vymazat varování."
      )
    await db.punishment.deleteMany({
      where: {
        punished: message.mentions.members.first().id,
        reason: "warn",
      },
    })
    message.channel.send(
      `${asMention(
        message.author
      )} úspěšně vyčistil varování uživateli ${asMention(
        message.mentions.members.first()
      )}.`
    )
  },
})
