import { Component, OnInit, Input } from '@angular/core';
import { ProPublicaService } from '../services/pro-publica.service';
import { Observable, Subject } from 'rxjs';
import { Vote } from '../models/vote.model';
import { Bill } from '../models/bill.model';
import { filter, map } from 'rxjs/operators';
import { isObjectEmpty } from '../utils/logic-helpers';
import { StoreService } from '../services/store.service';

@Component({
    selector: 'pac-bill-list',
    templateUrl: './bill-list.component.html',
    styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {
    @Input() chamber: 'house' | 'senate' = 'house';
    votes$: Observable<Vote[]>;
    bills$: Observable<Bill[]>;
    selectedBillInfo$: Subject<Bill> = new Subject();

    constructor(private store: StoreService) { }

    ngOnInit() {
        this.bills$ = this.store.bills.entities$;
    }

    selectBill(billUri: string) {
        // this.selectedBillInfo$.next(null);
        // this.proPublicaService.getBillDetails(billUri).subscribe(bill => {
        //     this.selectedBillInfo$.next(bill);
        // })
    }

}
