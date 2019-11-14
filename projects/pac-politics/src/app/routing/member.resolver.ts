import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProPublicaService } from '../services/pro-publica.service';
import { StoreService } from '../services/store.service';
import { map, catchError } from 'rxjs/operators';
import { Member } from '../models/member.model';

@Injectable()
export class MemberResolver implements Resolve<Observable<Member[]>> {
    constructor(
        private proPublicaService: ProPublicaService,
        private store: StoreService
    ) { }

    resolve() {
        return this.proPublicaService.getCurrentMembersByState('AR').pipe(
            map(members => {
                this.store.setHouseMembers(members);
                return members;
            }),
            catchError(err => {
                console.log(err);
                return of([]);
            })
        );
    }
}