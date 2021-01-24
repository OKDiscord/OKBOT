import { makeCommand } from "../../hooks/commands"
import { DiscordUser } from "@okbot/core/dist/db/EntityManager"
import { asMention } from "@okbot/core/dist/utils/discordUtils"

export default makeCommand({
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
    const isThere = await DiscordUser.findOne({
      discordId: message.mentions.members.first().id,
    })
    if (isThere) {
      await isThere.update({
        punishments: isThere.punishments.filter((el) => el.kind !== "warn"),
      })
      message.channel.send(
        `${asMention(
          message.author
        )} úspěšně vyčistil varování uživateli ${asMention(
          message.mentions.members.first()
        )}.`
      )
      return
    }
    message.reply("tento uživatel nemá žádná varování!")
  },
})
