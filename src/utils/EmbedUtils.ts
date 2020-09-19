import { MessageEmbed, User } from "discord.js"
import { Main } from "../Main"

export const createSimpleMention = (
  title: string,
  subtitle: string,
  user: User
) => {
  return createSimple(title, `${mention(user)}, ${subtitle}`)
}

export const createSimpleMultilineMention = (
  title: string,
  subtitle: string[],
  user: User
) => {
  subtitle[0] = `${mention(user)}, ${subtitle[0]}`
  return createSimpleMultiline(title, subtitle)
}

export const createSimple = (title: string, subtitle: string) => {
  return createDefault().setTitle(title).setDescription(subtitle)
}

export const mention = (user: User) => {
  return `<@${user.id}>`
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