import { Component, OnInit } from '@angular/core';
import { ProPublicaService } from '../services/pro-publica.service';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { Pac } from '../models/pac.model';
import { StoreService } from '../services/store.service';
import { distinctUntilChanged, withLatestFrom, map } from 'rxjs/operators';

@Component({
    selector: 'pac-chamber-tabs',
    templateUrl: './chamber-tabs.component.html',
    styleUrls: ['./chamber-tabs.component.scss']
})
export class ChamberTabsComponent implements OnInit {
    pacs$: Observable<Pac[]>;
    selectedPacId$: Observable<string>;
    selectedPac$: Observable<Pac>;

    constructor(private store: StoreService) {
        this.pacs$ = store.pacs$;
        this.selectedPacId$ = store.selectedPacId$;
        this.selectedPac$ = this.selectedPacId$.pipe(
            distinctUntilChanged(),
            withLatestFrom(this.pacs$),
            map(([selectedPacId, pacs]) => {
                return pacs.find(pac => pac.id === selectedPacId);
            })
        )

    }

    ngOnInit() {
    }

}
