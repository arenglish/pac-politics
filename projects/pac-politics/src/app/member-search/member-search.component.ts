import { Component, Input, ChangeDetectionStrategy, HostBinding, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Member } from '../models/member.model';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'pac-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchComponent implements OnDestroy {
  @Input() members: Member[];

  @HostBinding('style.display') hostStyleDisplay = 'flex';
  @HostBinding('style.height') hostStyleHeight = '3em';

  @Output('memberFound') _member = new EventEmitter<Member>();
  private readonly _member$ = new BehaviorSubject<Member>(null);

  constructor() {
    this._member$.pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
      tap(val => {
        this._member.emit(val)
      })
    ).subscribe()
  }

  ngOnDestroy() {}

  keyup(value: string) {
    const members = this.members.filter(m => m.name.toLowerCase().includes(value.toLowerCase()));
    if (members.length === 1) {
      this._member$.next(members.pop());
    } else {
      this._member$.next(null);
    }
  }
}
