import { logger } from "../../Main"
import { makeCommand } from "../../types/Command"

export default makeCommand({
  name: "kick",
  description: [
    "Kick vyhodí daného uživatele.",
    "Jen pro moderátory!",
    "Použití: kick <uživatel>.",
  ],
  run: async (message) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      return await message.reply("nemáš oprávnění na tento příkaz.")
    }

    if (message.mentions.everyone) {
      return await message.reply("nemůžeš vykickovat všechny.")
      // TODO: alert admins?
    }

    if (message.mentions.members.size === 0) {
      return await message.reply("musíš označit osobu kterou chceš kicknout!")
    }

    const toKick = message.mentions.members.first()

    if (!toKick.kickable) {
      return await message.reply("nemůžeš kicknout daného člověka.")
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
    message.channel.send(
      `${toKick.nickname} byl/a úspěšně vyhozen/a!\nZodpovědný Moderátor: <@${message.author.id}>!`
    )
    return await toKick.kick()
  },
})
