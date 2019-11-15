import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { StoreService } from "../../services/store.service";
import { Member, MemberService } from "@arenglish/pro-publica";
import { MemberStore } from "../../services/member.store";
import { ChamberTypes } from "../../../../../pro-publica/src/lib/models";

@Component({
  selector: "pac-chamber-tabs",
  templateUrl: "./chamber-tabs.component.html",
  styleUrls: ["./chamber-tabs.component.scss"],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChamberTabsComponent {
  members$: Observable<Member[]>;

  constructor(
    private store: StoreService,
    private memberService: MemberService,
    private memberStore: MemberStore
  ) {
    this.members$ = this.memberStore.members.entities$;
  }

  setChamber(chamber: ChamberTypes) {
    this.store.set.selectedChamber(chamber);
  }

  memberFound(memberID: string) {
    this.store.set.selectedMemberID(memberID);
  }
}
