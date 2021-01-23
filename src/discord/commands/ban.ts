import { logger } from "../../Main"
import { makeCommand } from "../../hooks/commands"
import {
  createSimpleMention,
  createSimpleMultiline,
} from "../../utils/embedUtils"
import { asMention } from "../../utils/discordUtils"

export default makeCommand({
  name: "ban",
  description: [
    "Ban zabanuje daného uživatele.",
    "Jen pro moderátory!",
    "Použití: ban <uživatel>.",
  ],
  run: async (message) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return await message.channel.send(
        createSimpleMention(
          "Chyba",
          "nemáš oprávnění na tento příkaz.",
          message.author
        )
      )
    }

    if (message.mentions.everyone) {
      return await message.channel.send(
        createSimpleMention(
          "Chyba",
          "nemůžeš zabanovat všechny.",
          message.author
        )
      )
      // TODO: alert admins?
    }

    if (message.mentions.members.size === 0) {
      return await message.channel.send(
        createSimpleMention(
          "Chyba",
          "musíš označit osobu, kterou chceš zabanovat.",
          message.author
        )
      )
    }

    const toBan = message.mentions.members.first()

    if (!toBan.bannable) {
      return await message.channel.send(
        createSimpleMention(
          "Chyba",
          "nemáš oprávnění na tento příkaz.",
          message.author
        )
      )
    }

    try {
      // Zdravím, ale naneštěstí jsi byl zabanován na Okeyku!\nZodpovědný moderátor: ${message.author.username}
      await toBan.send(
        createSimpleMultiline("Zabanován", [
          `Zdravím, ${asMention(toBan.user)}`,
          "",
          "Naneštěstí jsi byl zabanován na Okeyku!",
          `Zodpovědný moderátor: ${message.author.username}#${message.author.discriminator}`,
        ])
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
      createSimpleMultiline("Zabanován", [
        `Uživatel ${toBan.user.username} byl zabanován!`,
        `Zodpovědný moderátor: ${message.author.username}#${message.author.discriminator}`,
      ])
    )
    return await toBan.ban()
  },
})
