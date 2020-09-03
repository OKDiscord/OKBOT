import { Event, logger } from "../../Main"

class Disconnect {
  constructor() {
    return {
      listensTo: "disconnect",
      run: () => {
        return logger.error("got disconnected from discord.")
      },
    } as Event<"disconnect">
  }
}

export default Disconnect
