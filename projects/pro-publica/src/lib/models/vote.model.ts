import { ChamberTypes } from "./member.model";
import { Bill } from "./bill.model";
import { get } from "lodash";

export class Vote {
  congress: number;

  chamber: ChamberTypes = "house";
  session = 1;
  rollCall: number;
  description: string;
  source: string;
  url: string;
  voteUri: string;
  bill: Bill;
  documentTitle: string;

  constructor(init: Vote) {
    Object.assign(this, init);
  }

  public static getShortTitle(vote: Vote) {
    const nominationTitle = Vote.getNominationTitle(vote);
    return (
      get(vote, "bill.title") ||
      get(vote, "bill.number") ||
      nominationTitle ||
      get(vote, "description", "See Details")
    );
  }

  public static getNominationName(vote: Vote) {
    return get(vote, "nomination.name");
  }

  public static getNominationTitle(vote: Vote) {
    const name = Vote.getNominationName(vote);
    return name && "Nomination of " + name;
  }
}
