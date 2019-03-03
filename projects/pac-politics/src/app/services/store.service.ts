import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Pac } from '../models/pac.model';
import { Bill } from '../models/bill.model';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    mobileBrowser$: ReplaySubject<boolean> = new ReplaySubject(1);
    sideNavOpen$: ReplaySubject<boolean> = new ReplaySubject(1);
    pacs$: ReplaySubject<Pac[]> = new ReplaySubject(1);
    selectedPacId$: ReplaySubject<string> = new ReplaySubject(1);
    bills$: ReplaySubject<Bill[]> = new ReplaySubject(1);

    constructor() {
        this.mobileBrowser$.next(false);
        this.sideNavOpen$.next(true);
        this.pacs$.next([]);
        this.selectedPacId$.next(null);
        this.bills$.next([]);
    }

    setMobileBrowser(isMobileBrowser: boolean) {
        this.mobileBrowser$.next(isMobileBrowser);
    }

    setSideNavOpen(isOpen: boolean) {
        this.sideNavOpen$.next(isOpen);
    }

    setPacs(pacs: Pac[]) {
        this.pacs$.next(pacs);
    }

    setSelectedPacId(pacId: string) {
        this.selectedPacId$.next(pacId);
    }

    setBills(bills: Bill[]) {
        this.bills$.next(bills);
    }
}
