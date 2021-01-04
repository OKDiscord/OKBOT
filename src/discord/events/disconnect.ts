import { logger } from "../../Main"
import { makeEvent } from "../../types/Event"

export default makeEvent({
  listensTo: "disconnect",
  run: () => {
    return logger.error("got disconnected from discord.")
  },
})
