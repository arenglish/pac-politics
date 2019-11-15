import { session, chamber } from "./types";
import { Transform, Type } from "class-transformer";
import { Bill } from "../../../../../pro-publica/src/lib/models/bill.model";

export class Vote {
  congress: number;

  @Transform((val: string, obj) => val.toLowerCase())
  chamber: chamber = "house";

  session: session = 1;

  rollCall: number;
  description: string;

  source: string;
  url: string;

  voteUri: string;

  @Type(() => Bill)
  bill: Bill;
}
