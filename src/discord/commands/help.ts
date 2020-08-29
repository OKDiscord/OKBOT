import { getMongoManager } from "typeorm"
import { WarnProfile } from "../../db/entity/WarnProfile"

class Help {
  constructor() {
    return {
      name: "help",
      description: "Help Command",
      run: async (message) => {
        return message.reply("you are officially poggers!")
      },
    }
  }
}

export default Help
