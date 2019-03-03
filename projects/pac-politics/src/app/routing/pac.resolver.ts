
import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pac } from '../models/pac.model';
import { FecService } from '../services/fec.service';
import { catchError, map } from 'rxjs/operators';
import { StoreService } from '../services/store.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PacResolver implements Resolve<Observable<Pac[]>> {
    constructor(private fecService: FecService, private store: StoreService) { }

    resolve() {
        return this.fecService.getAllPACDetails().pipe(
            map(pacs => {
                this.store.setPacs(pacs);
                return pacs;
            }),
            catchError(err => {
                console.log(err);
                return of(null)
            }))
    }
}