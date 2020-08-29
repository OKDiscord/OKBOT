import { Command, logger } from "../../Main"

class Ban {
  constructor() {
    return {
      name: "ban",
      description: "Ban zabanuje daného uživatele.\nJen pro moderátory!",
      run: async (message, context) => {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
          return message.reply("nemáš oprávnění na tento příkaz.")
        }

        if (message.mentions.everyone) {
          return message.reply("nemůžeš zabanovat všechny.")
          // TODO: alert admins?
        }

        if (message.mentions.members.size === 0) {
          return message.reply("musíš označit osobu kterou chceš zabanovat!")
        }

        const toBan = message.mentions.members.first()

        if (!toBan.bannable) {
          return message.reply("nemůžeš zabanovat daného člověka.")
        }

        try {
          await toBan.send(
            `Zdravím, ale naneštěstí jsi byl zabanován na Okeyku!\nZodpovědný moderátor: ${message.author.username}`
          )
        } catch (e) {
          /** @see https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes */
          if (e.code && e.code === 50007) {
            logger.error(
              `Uživatele ${toBan.user.username} jsme nedokázali notifikovat o banu.`
            )
          } else {
            logger.error(
              `Došlo k chybě při banování ${toBan.user.username} moderátorem ${message.member.user.id}`
            )
            logger.error({ e })
          }
        }
        message.channel.send(
          `${toBan.user.username} byl/a úspěšně zabanován/a!\nZodpovědný Moderátor: <@${message.author.id}>!`
        )
        return await toBan.ban()
      },
    } as Command
  }
}

export default Ban
