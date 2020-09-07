import { ClientEvents } from "discord.js"
import { Context } from "./Context"

export interface EventContext<K extends keyof ClientEvents> extends Context {
  eventName: K
  args: ClientEvents[K]
}

export interface Event<K extends keyof ClientEvents> {
  listensTo: K
  run: (context: EventContext<K>) => unknown
}
