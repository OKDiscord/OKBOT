import { makeEvent } from "../../types/Event"
import config from "../../../config"
import { CommandContext } from "../../types/Command"

export default makeEvent({
  listensTo: "message",
  run: async ({ args: [message], discord }) => {
    if (message.author.bot) return false
    if (!message.cleanContent.startsWith(config.prefix) || !message.guild)
      return false
    const args = message.cleanContent
      .slice(config.prefix.length)
      .trim()
      .split(" ")
    const commandName = args.shift().toLowerCase()
    for (const command of discord.commands) {
      if (command.name === commandName) {
        if (command.permissible) {
          const { roles, all } = command.permissible
          const { array: roleCache } = message.member.roles.cache
          const allowed = all
            ? roleCache().every((item) => roles.includes(item.id))
            : roleCache().some((item) => roles.includes(item.id))
          if (!allowed)
            return await message.reply("na tento příkaz nemáš oprávnění!")
        }
        const commandContext: CommandContext = {
          args,
          discord,
        }
        return command.run(message, commandContext)
      }
    }
    return await message.reply("toto není příkaz!")
  },
})
