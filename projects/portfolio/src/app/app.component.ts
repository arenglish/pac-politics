import { Component } from '@angular/core';
import { StoreService } from 'projects/portfolio/src/app/services/store.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'portfolio';

    constructor(private store: StoreService) {
        const isMobile = (<any>window).systemVars.isMobileBrowser;
        this.store.setMobileBrowser(isMobile);
    }

    sidenavToggled() {
        this.store.toggleSidenav();
    }
}
