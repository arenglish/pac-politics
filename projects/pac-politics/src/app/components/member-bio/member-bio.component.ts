import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from "@angular/core";
import { Member } from "@arenglish/pro-publica";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { get } from "lodash";

@Component({
  selector: "pac-member-bio",
  templateUrl: "./member-bio.component.html",
  styleUrls: ["./member-bio.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberBioComponent {
  private readonly _member$ = new BehaviorSubject(null);
  private readonly member$ = this._member$.asObservable();
  @Input() set member(member: Member) {
    this._member$.next(member);
  }
  @Input() memberImage = "";
  private readonly partyLogo$: Observable<string>;

  @HostBinding("style.width") hostStyleWidth = "60%";
  // @HostBinding('style.height') hostStyleHeight = '30em';

  private readonly logoUrlMap = {
    R: "assets/republican-logo.svg",
    D: "assets/democrat-logo.png",
    I: "assets/independent-logo.svg"
  };

  constructor() {
    this.partyLogo$ = this.member$.pipe(
      map(member => {
        const party = get(member, "party", "I");
        return this.logoUrlMap[party];
      })
    );
  }
}
