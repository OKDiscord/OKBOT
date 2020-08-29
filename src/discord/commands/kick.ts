import { Command, logger } from "../../main"

class Kick {
  constructor() {
    return {
      name: "kick",
      description: "Kick vyhodí daného uživatele.\nJen pro moderátory!",
      run: async (message, context) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
          return message.reply("nemáš oprávnění na tento příkaz.")
        }

        if (message.mentions.everyone) {
          return message.reply("nemůžeš vykickovat všechny.")
          // TODO: alert admins?
        }

        if (message.mentions.members.size === 0) {
          return message.reply("musíš označit osobu kterou chceš kicknout!")
        }

        const toKick = message.mentions.members.first()

        if (!toKick.kickable) {
          return message.reply("nemůžeš kicknout daného člověka.")
        }

        try {
          await toKick.send(
            `Zdravím, ale naneštěstí jsi byl vyhozen z Okeyka!\nZodpovědný moderátor: ${message.author.username}`
          )
        } catch (e) {
          /** @see https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes */
          if (e.code && e.code === 50007) {
            logger.error(
              `Uživatele ${toKick.user.username} jsme nedokázali notifikovat o kicku.`
            )
          } else {
            logger.error(
              `Došlo k chybě při kickování ${toKick.user.username} moderátorem ${message.member.user.id}`
            )
            logger.error({ e })
          }
        }

        return await toKick.kick()
      },
    } as Command
  }
}

export default Kick
