export default {
  token: "your bot token",
  prefix: "!prefix ",
  mongoUri: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/${process.env.MONGO_DBNAME}`,
  muteRoleId: "mute role id",
  memberCountChannelId: "member count channel id",
}
