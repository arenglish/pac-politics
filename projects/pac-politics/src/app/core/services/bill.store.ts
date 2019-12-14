import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Entities } from "../../shared/models/entity.model";
import { Bill, BillService } from "@arenglish/pro-publica";
import { StoreService } from "./store.service";
import { BillType } from "@arenglish/pro-publica";
import {
  distinctUntilChanged,
  first,
  map,
  switchMap,
  tap
} from "rxjs/operators";
import { get } from "lodash";

@Injectable({
  providedIn: "root"
})
export class BillStore {
  readonly memberBills$: Observable<Bill[]>;

  constructor(private billService: BillService, private store: StoreService) {
    this.memberBills$ = this.store.selectedMemberID.entities$.pipe(
      distinctUntilChanged(),
      switchMap(id => this.fetchMemberBills(id, "introduced"))
    );
  }

  private fetchMemberBills(
    memberId: string,
    type: BillType
  ): Observable<Bill[]> {
    return this.billService.recentBillsByASpecificMember(memberId, type).pipe(
      first(),
      map(res => {
        return get(res, "results.0.bills", []).map(b => new Bill(b));
      })
    );
  }
}
