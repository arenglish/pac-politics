import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Entities } from "../../shared/models/entity.model";
import { Bill, BillService } from "@arenglish/pro-publica";
import { first, tap } from "rxjs/operators";
import { get } from "lodash";
import { StoreService } from "./store.service";

@Injectable({
  providedIn: "root"
})
export class BillStoreService {
  readonly bills = new Entities<Bill>(new BehaviorSubject([]));

  constructor(private billService: BillService, private store: StoreService) {}

  fetchBills(congress: number) {
    // this.billService.getRecentBills(congress).pipe(
    //   first(),
    //   tap(res => {
    //     const bills = get(res, 'results.0.bills');
    //     this.setBills(bills);
    //   })
    // )
  }

  setBills(bills: Bill[]) {
    this.bills.hydrate(bills);
  }
}
