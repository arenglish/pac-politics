import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Member } from "@arenglish/pro-publica";
import { Searchable } from "@shared";
import { get } from "lodash";
import { tap } from "rxjs/operators";
import { untilDestroyed } from "ngx-take-until-destroy";

@Component({
  selector: "pac-member-search",
  templateUrl: "./member-search.component.html",
  styleUrls: ["./member-search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchComponent extends Searchable<Member, string>
  implements OnDestroy {
  @Input() set members(members) {
    this.searchList = members;
  }

  @HostBinding("style.display") hostStyleDisplay = "flex";
  @HostBinding("style.height") hostStyleHeight = "3em";
  @HostBinding("style.width") hostStyleWidth = "80%";

  @Output("memberFound") _member = new EventEmitter<string>();

  constructor() {
    super((inputValue: string, memberEl: Member) => {
      return get(memberEl, "name", "")
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    });

    this.matches$
      .pipe(
        untilDestroyed(this),
        tap(matches => {
          if (matches.length === 1) {
            this._member.emit(matches[0].id);
          } else {
            this._member.emit("");
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {}

  keyup(value: string) {
    this.searchValue = value;
  }
}
