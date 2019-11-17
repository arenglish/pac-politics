import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { MemberStore } from "../services/member.store";
import { Injectable } from "@angular/core";
import { StoreService } from "../services/store.service";

@Injectable({
  providedIn: "root"
})
export class MemberSearchGuard implements Resolve<any> {
  constructor(private memberStore: MemberStore, private store: StoreService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const chamber = route.params.chamber;
    const congress = route.params.congress;

    this.store.set.selectedCongressSession(congress);
    this.store.set.selectedChamber(chamber);
    this.memberStore.members.hydrate([]);
    return this.memberStore.fetchMembers(congress, chamber);
  }
}
