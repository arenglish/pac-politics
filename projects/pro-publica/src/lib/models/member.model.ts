import { Expose, Transform } from "class-transformer";
import { Vote } from "./vote.model";
export enum CHAMBERS {
  house = "house",
  senate = "senate",
  both = "both"
}
export type ChamberTypes = keyof typeof CHAMBERS;

function getNameParts(name: string) {
  const split = name.split(" ");
  return {
    firstName: split.splice(0, 1),
    lastName: split.join(" ")
  };
}

type MemberParty = "R" | "D";

export class Member {
  id: string;
  crpId: string;
  apiUri: string;
  party: MemberParty;
  firstName: string;
  lastName: string;
  name: string;
  votes: Vote[];

  constructor(init: Member) {
    Object.assign(this, init);
    this.name = init.name || init.firstName + " " + init.lastName;
  }
}
