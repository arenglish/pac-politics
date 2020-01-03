import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { filter, first, map, tap } from 'rxjs/operators';
import { auth, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getDaysUsedFromYear } from '../utils/year.helper';

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
  used: number;
  remaining: number;
}

export interface UserPto {
  years: PtoYear[];
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  userPto$: Observable<UserPto>;
  user$: Observable<User>;

  constructor(private firebase: FirebaseService, private fireAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.fireAuth.user;
    this.userPto$ = this.firebase.userPto$.pipe(
      filter(res => !!res),
      map(userPto => {
        const years = userPto.years.map(year => {
          if (year) {
            const used = getDaysUsedFromYear(year);
            return {
              ...year,
              used,
              remaining: year.allowance - used
            } as PtoYear
          } else {
            return year;
          }
        })

        return {
          ...userPto,
          years
        }
      })
    )
  }

  login() {
    this.fireAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
  logout() {
    this.fireAuth.auth.signOut();
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
          }
        } else {
          return year;
        }
      })

      return {
        ...user,
        years
      }
    })
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
          }
        } else {
          return year;
        }
      })

      return {
        ...user,
        years
      }
    })
  }

  deleteYear(yearNumber) {
    this.transformUserPto(user => {
      return {
        ...user,
        years: user.years.filter(year => year.number !== yearNumber)
      }
    })
  }

  addYear(year: PtoYear): void {
    this.transformUserPto(user => {
      return {
        ...user,
        years: [ year, ...user.years ]
      }
    })
  }

  private transformUserPto(transform: (userPto: UserPto) => UserPto) {
    this.userPto$.pipe(
      first(),
      tap(userPto => {
        let user = new Object(userPto) as UserPto;
        user = transform(user);
        this.firebase.updateUserDocument(user);
      })
    ).subscribe()
  }
}
