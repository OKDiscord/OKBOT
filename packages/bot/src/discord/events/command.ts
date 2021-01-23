import { makeEvent } from "../../hooks/events"
import { cfg } from "@okbot/core"
import { CommandContext } from "../../types/command"

export default makeEvent({
  listensTo: "message",
  run: async ({ args: [message], ...ctx }) => {
    if (message.author.bot) return false
    if (!message.cleanContent.startsWith(cfg.discord.prefix) || !message.guild)
      return false
    const args = message.cleanContent
      .slice(cfg.discord.prefix.length)
      .trim()
      .split(" ")
    const commandName = args.shift().toLowerCase()
    for (const command of ctx.commands) {
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
          ...ctx,
        }
        return command.run(message, commandContext)
      }
    }
    return await message.reply("toto není příkaz!")
  },
})
