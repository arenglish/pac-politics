import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Bill } from '../models/bill.model';
import { ProPublicaService } from '../services/pro-publica.service';
import { StoreService } from '../services/store.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class BillsResolver implements Resolve<Observable<Bill[]>> {
    constructor(
        private proPublicaService: ProPublicaService,
        private store: StoreService
    ) { }

    resolve() {
        return this.proPublicaService.getRecentBills().pipe(
            map(bills => {
                this.store.setBills(bills);
                return bills;
            }),
            catchError(err => {
                console.log(err);
                return of([]);
            })
        );
    }
}