import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject, combineLatest } from 'rxjs';
import { Pac } from '../models/pac.model';
import { Bill } from '../models/bill.model';
import { Entity } from '../models/entity.model';
import { Member } from '../models/member.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private readonly _mobileBrowser$ = new BehaviorSubject(false);
    readonly mobileBrowser$ = this._mobileBrowser$.asObservable();

    private readonly _sideNavOpen$ = new BehaviorSubject(true);
    readonly sideNavOpen$ = this._sideNavOpen$.asObservable();

    readonly pacs = new Entity<Pac>(new BehaviorSubject([]))
    readonly bills = new Entity<Bill>(new BehaviorSubject([]));
    readonly houseMembers = new Entity<Member>(new BehaviorSubject([]));
    readonly senateMembers = new Entity<Member>(new BehaviorSubject([]));

    private readonly _selectedPacId$ = new BehaviorSubject(null);
    readonly selectedPacId$ = this._selectedPacId$.asObservable();

    readonly members$ = combineLatest(this.houseMembers.entities$, this.senateMembers.entities$).pipe(
        map(([house, senate]) => house.concat(senate))
    )


    setMobileBrowser(isMobileBrowser: boolean) {
        this._mobileBrowser$.next(isMobileBrowser);
    }

    setSideNavOpen(isOpen: boolean) {
        this._sideNavOpen$.next(isOpen);
    }

    setPacs(pacs: Pac[]) {
        this.pacs.hydrate(pacs);
    }

    setSelectedPacId(pacId: string) {
        this._selectedPacId$.next(pacId);
    }

    setBills(bills: Bill[]) {
        this.bills.hydrate(bills);
    }

    setHouseMembers(members: Member[]) {
        this.houseMembers.hydrate(members);
    }

    setSenateMembers(members: Member[]) {
        this.senateMembers.hydrate(members);
    }
}
