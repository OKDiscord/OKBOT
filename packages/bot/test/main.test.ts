import { expect } from "chai"
import "mocha"

import fs from "fs"
import path from "path"
import Main from "../src"

const start = new Main(true)

describe("class Main", () => {
  describe("static version()", () => {
    it("should return version same as in the package.json", () => {
      const version = Main.version()
      const expected =
        JSON.parse(
          fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf-8")
        ).version || "2.0"
      expect(version).to.equal(expected)
    })
  })

  describe("static env()", () => {
    it("should be the same as NODE_ENV or 'production' if not set", () => {
      expect(Main.env()).to.equal(process.env.NODE_ENV || "production")
    })
  })

  describe("initDatabase()", () => {
    it("should be connected to the database", async () => {
      await start.initDatabase()
      expect(start.db).to.not.be.undefined.and.not.be.null
    })
  })
})
