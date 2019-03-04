import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from 'projects/portfolio/src/app/services/store.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'portfolio-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    sidenavOpen$: Observable<boolean>;

    constructor(private store: StoreService) {
        this.sidenavOpen$ = this.store.sidenavOpen$.pipe(map(res => {
            return res;
        }));
    }

    ngOnInit() {
    }

}
