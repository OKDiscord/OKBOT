import { User, GuildMember } from "discord.js"

export const asMention = (toMention: User | GuildMember) => {
  const { id } = toMention instanceof GuildMember ? toMention.user : toMention
  return `<@${id}>`
}

export const asMentionString = (toMention: User | GuildMember) => {
  const { username, discriminator } =
    toMention instanceof GuildMember ? toMention.user : toMention
  return `${username}#${discriminator}`
}
