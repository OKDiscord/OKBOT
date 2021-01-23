import { prop } from "@typegoose/typegoose"
import { MongoEntity } from "../IEntity"

export type DiscordUserPunishment =
  | {
      kind: "mute" | "kick" | "warn" | "ban"
      reason: string
    }
  | { kind: "mute" | "ban"; duration: Date }

export class DiscordUser extends MongoEntity {
  @prop({ unique: true, required: true })
  discordId!: string

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @prop({ required: true, default: [] })
  punishments: DiscordUserPunishment[] = []
}
