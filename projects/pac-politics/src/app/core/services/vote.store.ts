import { Injectable } from "@angular/core";
import { Entities } from "../../shared/models/entity.model";
import { BehaviorSubject } from "rxjs";
import { StoreService } from "./store.service";
import { get } from "lodash";
import { ChamberTypes, Vote, VoteService } from "@arenglish/pro-publica";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class VoteStore {
  readonly votes = new Entities<Vote>(new BehaviorSubject<Vote[]>([]));

  constructor(private store: StoreService, private voteService: VoteService) {}

  fetchRecentVotes(chamber: ChamberTypes) {
    return this.voteService.recentVotes(chamber).pipe(
      tap(res => {
        const votes = get(res, "results.votes", []).map(v => new Vote(v));
        this.votes.hydrate(votes);
      })
    );
  }
}
