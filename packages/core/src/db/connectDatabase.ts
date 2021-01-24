import cfg from "../cfg";
import { connect as connectDb } from "mongoose";

export const connectDatabase = async () =>
  await connectDb(cfg.database(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default connectDatabase;
