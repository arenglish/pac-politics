import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Entity } from "../../shared/models/entity.model";
import { ChamberTypes, CHAMBERS } from "@arenglish/pro-publica";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  private readonly _mobileBrowser$ = new BehaviorSubject(false);
  readonly mobileBrowser$ = this._mobileBrowser$.asObservable();

  private readonly _sideNavOpen$ = new BehaviorSubject(true);
  readonly sideNavOpen$ = this._sideNavOpen$.asObservable();

  readonly selectedCongressSession = new Entity<number>(
    new BehaviorSubject(null)
  );
  readonly selectedMemberID = new Entity<string>(new BehaviorSubject(""));
  readonly selectedChamber = new Entity<ChamberTypes>(
    new BehaviorSubject(CHAMBERS.both)
  );

  constructor() {}

  set = {
    selectedCongressSession: (congress: number) =>
      this.selectedCongressSession.hydrate(congress),
    selectedMemberID: (memberID: string) =>
      this.selectedMemberID.hydrate(memberID),
    selectedChamber: (chamber: ChamberTypes) =>
      this.selectedChamber.hydrate(chamber)
  };

  setMobileBrowser(isMobileBrowser: boolean) {
    this._mobileBrowser$.next(isMobileBrowser);
  }

  setSideNavOpen(isOpen: boolean) {
    this._sideNavOpen$.next(isOpen);
  }
}
