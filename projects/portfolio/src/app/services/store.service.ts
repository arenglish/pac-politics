import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Injectable({
    providedIn: 'root'
})
export class StoreService implements OnDestroy {
    mobileBrowser$ = new BehaviorSubject<boolean>(false);
    sidenavOpen$ = new BehaviorSubject<boolean>(true);

    constructor() {
    }

    ngOnDestroy() { }

    setMobileBrowser(isMobile: boolean) {
        this.mobileBrowser$.next(isMobile);
    };

    toggleSidenav() {
        this.sidenavOpen$.pipe(
            first(),
            tap(isOpen => this.sidenavOpen$.next(!isOpen))
        ).subscribe();
    }
}
