import { Command } from "../../types/Command"
import config from "../../../config"
class Mute {
  constructor() {
    return {
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
        const muteRl = message.guild.roles.cache.find(
          (role) => role.id == config.muteRoleId
        )
        if (!muteRl)
          return await message.reply("role na tlumení není dostupná!")
        if (
          message.mentions.members
            .first()
            .roles.cache.find((role) => role.id == config.muteRoleId)
        ) {
          message.mentions.members.first().roles.remove(muteRl)
          message.reply("uživatelovo ztlumení bylo zrušeno.")
          return
        }
        message.mentions.members.first().roles.add(muteRl)
        message.reply("uživatel byl ztlumen.")
      },
    } as Command
  }
}

export default Mute
