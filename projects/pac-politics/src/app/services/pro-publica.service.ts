import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { Bill } from '../models/bill.model';
import { Vote } from '../models/vote.model';
import * as camelCaseKeys from 'camelcase-keys';
import { Chamber, Member } from '../models/member.model';

interface ProPublicaResponse<T> {
    copyright: string;
    results: T;
    status: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProPublicaService {
    proPublicahost = 'https://api.propublica.org/congress/v1';
    headers = new HttpHeaders({
        'X-API-Key': 'XHmLsDuRz3x59wsNN295qUN0IJAzkYCFXpIk11qJ'
    })

    constructor(private http: HttpClient) { }

    getRecentVotes(chamber: Chamber = 'house', count: number = 100): Observable<Vote[]> {
        const url = `${this.proPublicahost}/${chamber}/votes/recent.json`;

        return this.http.get(url, {
            headers: this.headers
        }).pipe(
            map(res => camelCaseKeys(res, { deep: true })),
            map((res: any) => {
                if (res.errors) {
                    throw res.errors;
                }
                const votes = plainToClass(Vote, res.results.votes);
                return votes;
            })
        );
    }

    getCurrentMembersByState(state: string, chamber: Chamber = 'house'): Observable<Member[]> {
        const url = `${this.proPublicahost}/members/${chamber}/${state}/current.json`;

        return this.http.get(url, {
            headers: this.headers
        }).pipe(
            map((res: ProPublicaResponse<Member[]>) => {
                return plainToClass(Member, res.results);
            })
        )
    }

    getRecentBills(chamber: 'house' | 'senate' = 'house', count: number = 100): Observable<Bill[]> {
        const url = `${this.proPublicahost}/115/${chamber}/bills/active.json`;

        return this.http.get(url, {
            headers: this.headers
        }).pipe(
            map(res => camelCaseKeys(res, { deep: true })),
            map((res: any) => {
                if (res.errors) {
                    throw res.errors;
                }

                if (res.results.length !== 1) {
                    throw new Error('Bill result not recognized');
                }

                const bills = plainToClass(Bill, res.results[0].bills);
                return bills;
            })
        );
    }

    getBillDetails(billUri: string): Observable<Bill> {
        return this.http.get(billUri, {
            headers: this.headers
        }).pipe(
            map(res => camelCaseKeys(res, { deep: true })),
            map((res: { results: Bill[];[key: string]: any }) => {
                if (res.errors) {
                    throw new Error(JSON.stringify(res.errors));
                }

                if (res.results.length !== 1) {
                    throw new Error('Bill result not recognized');
                }

                return plainToClass(Bill, res.results[0]);
            })
        );
    }
}
