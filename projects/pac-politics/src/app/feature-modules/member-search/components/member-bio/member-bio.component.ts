import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from "@angular/core";
import { Member } from "@arenglish/pro-publica";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { get } from "lodash";
import { environment } from "@pac/environments/environment";

@Component({
  selector: "pac-member-bio",
  templateUrl: "./member-bio.component.html",
  styleUrls: ["./member-bio.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberBioComponent implements AfterViewInit {
  private readonly _member$ = new BehaviorSubject(null);
  readonly member$ = this._member$.asObservable();
  @Input() set member(member: Member) {
    this._member$.next(member);
  }
  @Input() memberImage = "";
  readonly partyLogo$: Observable<string>;

  @HostBinding("style.width") hostStyleWidth = "60%";
  // @HostBinding('style.height') hostStyleHeight = '30em';

  private readonly logoUrlMap = {
    R: environment.assets.logos.republican,
    D: environment.assets.logos.democrat,
    I: environment.assets.logos.independent,
    ID: environment.assets.logos.independent,
    UNKNOWN: environment.assets.logos.independent
  };

  constructor() {
    this.partyLogo$ = this.member$.pipe(
      map(member => {
        const party = get(member, "party", "I");
        return this.logoUrlMap[party] || this.logoUrlMap.UNKNOWN;
      })
    );
  }

  ngAfterViewInit() {
    document
      .getElementById("bio-card")
      .scrollIntoView({ block: "start", behavior: "smooth" });
  }
}
