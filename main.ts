//Libs mad
import * as Discord from "discord.js"
import {createConnection, Connection} from 'typeorm'
import fs from "fs"
//Functions
//Main
class Main {
  // Variables
  client: Discord.Client

  constructor() {
    this.client = new Discord.Client()

    this.init()
  }

  async init() {
    
    await this.initDiscord()
  }

  async initDiscord() {
    try {
      this.client.login()
    } catch (e) {
      console.error("An error occurred while logging in.")
      console.log(e)
      process.exit(1)
    }
  }
}

export default Main