import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { ProPublicaService } from '../services/pro-publica.service';
import { Pac } from '../models/pac.model';
import { FirestoreService } from '../services/firestore.service';
import { FecService } from '../services/fec.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';
import { first, map, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { PacResolver } from '../routing/pac.resolver';

@Component({
    selector: 'pac-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
    @ViewChild('sideNav') sideNav;
    sideNavOpen$: Observable<boolean>;
    mobileBrowser$: Observable<boolean>;
    sideNavMode: 'side' | 'over' | 'push' = 'side';
    disableClose = true;
    pacs$: Observable<Pac[]>;
    selectedPacId$: Observable<string>;

    constructor(
        private route: ActivatedRoute,
        private store: StoreService
    ) {
        this.sideNavOpen$ = this.store.sideNavOpen$;
        this.mobileBrowser$ = this.store.mobileBrowser$;
        this.pacs$ = this.store.pacs$;
        this.selectedPacId$ = this.store.selectedPacId$.pipe(map(res => {
            return res;
        }));
    }

    ngOnInit() {
        this.mobileBrowser$.pipe(first()).subscribe(mobile => {
            if (mobile) {
                this.sideNavMode = 'over';
                this.disableClose = false;
            }
        })

        this.pacs$.pipe(
            untilDestroyed(this),
            filter(pacs => pacs.length > 0),
            tap(pacs => {
                this.store.setSelectedPacId(pacs[0].id);
            })
        ).subscribe()

        this.sideNavOpen$.pipe(untilDestroyed(this), distinctUntilChanged(), map(open => {
            this.sideNav.toggle();
        })).subscribe()
    }

    ngOnDestroy() { }

    selectPac(pacId: string) {
        this.store.setSelectedPacId(pacId);
    }

}
