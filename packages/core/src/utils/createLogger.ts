import { WinstonFactory } from "@fasteerjs/fasteer";
import { createLogger as winston } from "winston";

export const createLogger = () => winston(WinstonFactory.defaultConfig);

export default createLogger;
