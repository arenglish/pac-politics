import { Injectable } from "@angular/core";
import { Entities } from "../../shared/models/entity.model";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { ChamberTypes, Member, MemberService } from "@arenglish/pro-publica";
import { StoreService } from "./store.service";
import { get } from "lodash";

@Injectable({
  providedIn: "root"
})
export class MemberStore {
  readonly members = new Entities<Member>(new BehaviorSubject<Member[]>([]));
  readonly selectedMember$: Observable<Member>;
  readonly memberImage$: Observable<string>;

  private readonly imageSizePlaceHolder = "{size}";
  private readonly idPlaceholder = "{id}";
  private readonly memberImageHostTemplate = `https://theunitedstates.io/images/congress/${this.imageSizePlaceHolder}/${this.idPlaceholder}.jpg`;

  constructor(
    private store: StoreService,
    private memberService: MemberService
  ) {
    this.selectedMember$ = combineLatest(
      this.members.entities$,
      this.store.selectedMemberID.entities$
    ).pipe(
      map(([members, id]) => {
        return members.find(m => m.id === id);
      })
    );
    this.memberImage$ = this.selectedMember$.pipe(
      filter(member => !!member),
      map(member => {
        return this.memberImageHostTemplate
          .replace(this.imageSizePlaceHolder, "450x550")
          .replace(this.idPlaceholder, member.id);
      })
    );
  }

  fetchMembers(congress: number, chamber: ChamberTypes) {
    this.memberService
      .membersListByCongress(congress, chamber)
      .pipe(
        tap(res => {
          const members = get(res, "results.0.members", []).map(
            m => new Member(m)
          );
          this.members.hydrate(members);
        })
      )
      .subscribe();
  }
}
