import { Transform, Type } from "class-transformer";
import { Bill, ChamberTypes } from "@arenglish/pro-publica";

export class Vote {
  congress: number;

  @Transform((val: string, obj) => val.toLowerCase())
  chamber: ChamberTypes = "house";

  session = 1;

  rollCall: number;
  description: string;

  source: string;
  url: string;

  voteUri: string;

  @Type(() => Bill)
  bill: Bill;
}
