import cfg from "../cfg";
import { connect as connectDb } from "mongoose";

export default async () =>
  await connectDb(cfg.database(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
