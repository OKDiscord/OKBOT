import { Event } from "../../types/Event"
import config from "../../../config"
import { CommandContext } from "../../types/Command"

class Command {
  constructor() {
    return {
      listensTo: "message",
      run: async (context) => {
        const message = context.args[0]

        if (message.author.bot) return false

        if (!message.cleanContent.startsWith(config.prefix) || !message.guild)
          return false

        const args = message.cleanContent
          .slice(config.prefix.length)
          .trim()
          .split(" ")
        const commandName = args.shift().toLowerCase()

        for (const command of context.discord.commands) {
          if (command.name === commandName) {
            const commandContext: CommandContext = {
              args,
              discord: context.discord,
            }
            return command.run(message, commandContext)
          }
        }

        return await message.reply("toto není příkaz!")
      },
    } as Event<"message">
  }
}

export default Command
