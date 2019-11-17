import { Component } from "@angular/core";
import { CHAMBERS, ChamberTypes, Member } from "@arenglish/pro-publica";
import { Observable } from "rxjs";
import { MemberStore } from "../../core/services/member.store";
import { StoreService } from "../../core/services/store.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  pairwise,
  shareReplay,
  startWith,
  tap
} from "rxjs/operators";
import { MatTabChangeEvent } from "@angular/material";

@Component({
  selector: "pac-member-search-page",
  templateUrl: "./member-search.page.html",
  styleUrls: ["./member-search.page.scss"]
})
export class MemberSearchPage {
  readonly members$: Observable<Member[]>;
  readonly background$: Observable<string>;
  private readonly backgroundUrlMap = {
    house: "/assets/house-seal.svg",
    senate: "/assets/senate-seal.svg"
  };

  $selectedChamber: Observable<ChamberTypes>;

  chamberIndexMap = {
    0: "senate",
    1: "house"
  };

  constructor(
    public memberStore: MemberStore,
    private ar: ActivatedRoute,
    private store: StoreService,
    private router: Router
  ) {
    this.$selectedChamber = this.store.selectedChamber.entities$.pipe(
      distinctUntilChanged(),
      shareReplay(1)
    );
    this.members$ = this.memberStore.members.entities$;
    this.background$ = this.ar.params.pipe(
      map(params => {
        const chamber = params.chamber;
        return this.backgroundUrlMap[chamber];
      })
    );
  }

  memberFound(memberID: string) {
    this.store.set.selectedMemberID(memberID);
  }

  setChamber(event: MatTabChangeEvent) {
    const chamber = this.chamberIndexMap[event.index];
    this.store.selectedCongressSession.entities$
      .pipe(
        first(),
        tap(session => {
          this.router.navigateByUrl(`/${chamber}/${session}`);
        })
      )
      .subscribe();
  }
}
