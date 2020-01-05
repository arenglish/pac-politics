import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { FirebaseService } from "./firebase.service";
import { first, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { getDaysUsedFromYear } from "../utils/year.helper";
import { User, auth } from "firebase/app";

export enum LOADING_STATE {
  EMPTY,
  WAITING,
  LOADED
}
export interface Pto {
  id: string;
  title: string;
  description: string;
  days: number;
}

export interface PtoYear {
  number: string;
  entries: Pto[];
  allowance: number;
  used?: number;
  remaining?: number;
  carryover?: number;
}

export interface UserPto {
  years: PtoYear[];
}

@Injectable({
  providedIn: "root"
})
export class SessionService {
  userPto$: Observable<UserPto>;
  user$: Observable<User>;
  loadingState$ = new BehaviorSubject<number>(LOADING_STATE.EMPTY);

  constructor(
    private firebase: FirebaseService,
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user$ = this.fireAuth.user;
    this.userPto$ = this.firebase.userPto$.pipe(
      map(userPto => {
        console.log(userPto);
        this.loadingState$.next(LOADING_STATE.LOADED);
        if (!userPto) {
          return userPto;
        }
        const years = userPto.years
          .reverse()
          .reduce((all, year, index) => {
            let updatedYear = year;
            if (year) {
              const used = getDaysUsedFromYear(year);
              const carryover =
                index !== 0 ? userPto.years[index - 1].remaining : 0;
              updatedYear = {
                ...year,
                used,
                remaining: year.allowance + carryover - used,
                carryover
              } as PtoYear;
            }

            all.push(updatedYear);
            return all;
          }, [])
          .reverse();

        return {
          ...userPto,
          years
        };
      })
    );
  }

  login() {
    this.fireAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
  logout() {
    this.fireAuth.auth.signOut();
  }

  setLoadingState(state: number) {
    this.loadingState$.next(state);
  }

  addPto(pto: Pto, yearNumber: string) {
    this.transformUserPto(user => {
      const years = user.years.map(year => {
        if (year.number === yearNumber) {
          let entries = year.entries.slice(0);
          entries.splice(0, 0, pto);
          return {
            ...year,
            entries
          };
        } else {
          return year;
        }
      });

      return {
        ...user,
        years
      };
    });
  }

  deletePto(index: number, yearNumber) {
    this.transformUserPto(user => {
      const years = user.years.map(year => {
        if (year.number === yearNumber) {
          let entries = year.entries.slice(0);
          entries.splice(index, 1);
          return {
            ...year,
            entries
          };
        } else {
          return year;
        }
      });

      return {
        ...user,
        years
      };
    });
  }

  deleteYear(yearNumber) {
    this.transformUserPto(user => {
      return {
        ...user,
        years: user.years.filter(year => year.number !== yearNumber)
      };
    });
  }

  addYear(year: PtoYear): void {
    this.transformUserPto(user => {
      return {
        ...user,
        years: [year, ...user.years]
      };
    });
  }

  private transformUserPto(transform: (userPto: UserPto) => UserPto) {
    this.initUserPtoIfNone()
      .pipe(
        switchMap(() => this.userPto$),
        first(),
        tap(userPto => {
          let user = new Object(userPto) as UserPto;
          user = transform(user);
          this.firebase.updateUserDocument(user);
        })
      )
      .subscribe();
  }

  private initUserPtoIfNone() {
    return this.userPto$.pipe(
      first(),
      withLatestFrom(this.user$),
      switchMap(([userPto, user]) => {
        if (!userPto) {
          return this.firebase.createUserPtoDocument(user.uid);
        } else {
          return of(true);
        }
      })
    );
  }
}
