import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output
} from "@angular/core";
import { Member } from "@arenglish/pro-publica";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { get } from "lodash";
import { environment } from "@pac/environments/environment";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { StoreService } from "@pac/app/core/services/store.service";
import { untilDestroyed } from "ngx-take-until-destroy";

@Component({
  selector: "pac-member-bio",
  templateUrl: "./member-bio.component.html",
  styleUrls: ["./member-bio.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberBioComponent implements AfterViewInit, OnDestroy {
  private readonly _member$ = new BehaviorSubject(null);
  readonly member$ = this._member$.asObservable();
  @Input() set member(member: Member) {
    this._member$.next(member);
  }
  @Input() memberImage = "";
  readonly partyLogo$: Observable<string>;

  @Output("seeVotingRecordButtonClicked")
  _seeVotingRecordButtonClicked = new EventEmitter<Member>();

  private readonly logoUrlMap = {
    R: environment.assets.logos.republican,
    D: environment.assets.logos.democrat,
    I: environment.assets.logos.independent,
    ID: environment.assets.logos.independent,
    UNKNOWN: environment.assets.logos.independent
  };

  constructor(private sanitizer: DomSanitizer, private store: StoreService) {
    this.partyLogo$ = this.member$.pipe(
      map(member => {
        const party = get(member, "party", "I");
        return this.logoUrlMap[party] || this.logoUrlMap.UNKNOWN;
      })
    );
  }

  ngOnDestroy() {}

  ngAfterViewInit(): void {
    this.store.memberSearchViewPosition.entities$
      .pipe(
        untilDestroyed(this),
        tap(position => {
          document
            .getElementById("bio-card")
            .scrollIntoView({ block: "start", behavior: "smooth" });
        })
      )
      .subscribe();
  }

  votingRecordButtonClicked(member: Member) {
    this._seeVotingRecordButtonClicked.emit(member);
  }
}
