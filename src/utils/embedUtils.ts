import { MessageEmbed, User, EmbedFieldData } from "discord.js"
import { Main } from ".."
import { asMention } from "./discordUtils"

export const createWithFields = (title: string, fields: EmbedFieldData[]) => {
  return createDefault().setTitle(title).addFields(fields)
}

export const createSimpleMention = (
  title: string,
  subtitle: string,
  user: User
) => {
  return createSimple(title, `${asMention(user)}, ${subtitle}`)
}

export const createSimpleMultilineMention = (
  title: string,
  subtitle: string[],
  user: User
) => {
  subtitle[0] = `${asMention(user)}, ${subtitle[0]}`
  return createSimpleMultiline(title, subtitle)
}

export const createSimple = (title: string, subtitle: string) => {
  return createDefault().setTitle(title).setDescription(subtitle)
}

export const createSimpleMultiline = (title, subtitle: string[]) => {
  return createSimple(title, subtitle.join("\n"))
}

export const createImage = (
  title: string,
  subtitle: string,
  imageUrl: string
) => {
  return createSimple(title, subtitle).setImage(imageUrl)
}

export const createDefault = () => {
  return new MessageEmbed()
    .setColor("#b23bf0")
    .setFooter(`OKBOT v${Main.version()} | By Simír Gerchán & Vottus`)
}
