import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from './services/store.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'pac-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class PacPoliticsComponent {
    title = 'pac-politics';
    sideNavOpen = true;
    mobileBrowser = false;
    showMenu = false;

    constructor(private route: ActivatedRoute, private store: StoreService) {

    }

    ngOnInit() {
        console.log(this.route.snapshot.data);
        this.mobileBrowser = (<any>window).systemVars.isMobileBrowser;

        this.store.setMobileBrowser(this.mobileBrowser);
        if (this.mobileBrowser) {
            this.showMenu = true;
        }
    }

    toggleSidenav() {
        this.store.sideNavOpen$.pipe(first()).subscribe(isOpen => {
            this.store.setSideNavOpen(!isOpen);
        })
    }
}
