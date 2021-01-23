import { sync as glob } from "glob"
import { logger } from "../../Main"
import { Context, Event } from "../../types"

import path from "path"
import { ClientEvents } from "discord.js"

export interface CreateEventProps {
  paths: string
  ctx: Context
}

export default async ({ paths, ctx }: CreateEventProps) => {
  for (const file of glob(paths)) {
    const evt = await import(file)
    let event: Event<keyof ClientEvents>

    if (typeof evt.default === "function") {
      logger.warn(
        `Event ${
          path.parse(file).base
        } is using the deprecated Class-like event. Consider switching to the Functional event.`
      )
      event = evt.default()
    } else if (typeof evt.default === "object") {
      event = evt.default
      if (!event.listensTo || !event.run) continue
    } else continue

    logger.info(`Registering event ${path.parse(file).base}`)

    ctx.client.on(evt.listensTo, (...args) =>
      evt.run({
        ...ctx,
        eventName: evt.listensTo,
        args,
      })
    )
  }
}
