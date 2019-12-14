import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Member } from "@arenglish/pro-publica";
import { Searchable } from "@shared";
import { get } from "lodash";
import { pairwise, startWith, tap } from "rxjs/operators";
import { untilDestroyed } from "ngx-take-until-destroy";

@Component({
  selector: "pac-member-search",
  templateUrl: "./member-search.component.html",
  styleUrls: ["./member-search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchComponent extends Searchable<Member, string>
  implements OnDestroy, AfterViewInit {
  @Input() set members(members) {
    this.searchList = members;
  }

  @HostBinding("style.display") hostStyleDisplay = "flex";
  @HostBinding("style.width") hostStyleWidth = "80%";

  @Output("memberFound") _member = new EventEmitter<string>();

  @ViewChild("memberSearch", { static: false }) memberSearchInput: ElementRef;

  constructor() {
    super((inputValue: string, memberEl: Member) => {
      return get(memberEl, "name", "")
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    });

    this.matches$
      .pipe(
        untilDestroyed(this),
        startWith([]),
        pairwise(),
        tap(([previousMatches, matches]) => {
          if (matches.length === 1) {
            this.memberSearchInput.nativeElement.blur();
            this._member.emit(matches[0].id);
          } else if (previousMatches.length === 1) {
            this._member.emit("");
          }
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.memberSearchInput.nativeElement.focus();
  }

  ngOnDestroy() {}

  keyup(value: string) {
    this.searchValue = value;
  }
}
