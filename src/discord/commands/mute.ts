import { makeCommand } from "../../hooks/commands"
import config from "../../../config"

export default makeCommand({
  name: "mute",
  description: [
    "Mute ztlumí daného uživatele.",
    "Pokud už ztlumený je, tak mu roli odebere.",
    "Jen pro moderátory!",
    "Použití: mute <uživatel>.",
  ],
  run: async (message) => {
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return await message.reply("nemáš oprávnění na tento příkaz.")

    if (message.mentions.members.size == 0)
      return await message.reply("nemám koho ztlumit!")

    const muteRole = message.guild.roles.cache.find(
      (role) => role.id == config.muteRoleId
    )
    if (!muteRole) return await message.reply("role na tlumení není dostupná!")

    const target = message.mentions.members.first()

    if (
      message.mentions.members
        .first()
        .roles.cache.find((role) => role.id == config.muteRoleId)
    ) {
      target.roles.remove(muteRole)
      message.reply("uživatelovo ztlumení bylo zrušeno.")
      return
    }

    target.roles.add(muteRole)

    message.reply("uživatel byl ztlumen.")
  },
})
