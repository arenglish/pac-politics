import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pac } from '../models/pac.model';
import { StoreService } from '../services/store.service';
import { distinctUntilChanged, withLatestFrom, map } from 'rxjs/operators';
import { Member } from '../models/member.model';
import { ProPublicaService } from '../services/pro-publica.service';

@Component({
    selector: 'pac-chamber-tabs',
    templateUrl: './chamber-tabs.component.html',
    styleUrls: ['./chamber-tabs.component.scss']
})
export class ChamberTabsComponent {
    pacs$: Observable<Pac[]>;
    selectedPacId$: Observable<string>;
    selectedPac$: Observable<Pac>;
    members$: Observable<Member[]>;

    constructor(private store: StoreService, private proPublicaService: ProPublicaService) {
        this.proPublicaService.getCurrentMembersByState('AR').subscribe(res => {
            this.store.setHouseMembers(res);
        });
        this.members$ = this.store.members$;

        this.pacs$ = store.pacs.entities$;
        this.selectedPacId$ = store.selectedPacId$;
        this.selectedPac$ = this.selectedPacId$.pipe(
            distinctUntilChanged(),
            withLatestFrom(this.pacs$),
            map(([selectedPacId, pacs]) => {
                return pacs.find(pac => pac.id === selectedPacId);
            })
        )

    }

    memberFound(event) {
        console.log(event);
    }
}
