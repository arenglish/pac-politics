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
  private _username$ = new BehaviorSubject<string>('');
  username$ = this._username$.asObservable();
  _userPto$ = new BehaviorSubject<UserPto>(null);
  userPto$ = this._userPto$.asObservable().pipe(
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
  );

  user$: Observable<User>;

  constructor(private firebase: FirebaseService, private fireAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.fireAuth.user;
  }

  setUser(username: string) {
    if (username !== this._username$.getValue()) {
      this._username$.next(username);
    }
  }

  clearData(): void {
    this._userPto$.next(null);
  }

  loadUserPto() {
    this.firebase.getUserDocument().pipe(
      first(),
      tap(res => {
        const userPto: UserPto = res.payload.data() as UserPto;
        this._userPto$.next(userPto);
      })
    ).subscribe()
  }

  login() {
    this.fireAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
  logout() {
    this.clearData();
    this.fireAuth.auth.signOut();
  }

  addPto(pto: Pto, yearNumber: string) {
    let user = new Object(this._userPto$.getValue()) as UserPto;
    user.years = user.years.map(year => {
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
    this.firebase.updateUserDocument(user);
  }

  deletePto(index: number, yearNumber) {
    let user = new Object(this._userPto$.getValue()) as UserPto;
    user.years = user.years.map(year => {
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
    this.firebase.updateUserDocument(user);
  }

  addYear(year: PtoYear) {
    let user = new Object(this._userPto$.getValue()) as UserPto;
    user.years = [ year, ...user.years ];
    console.log(year);
    this.firebase.updateUserDocument(user);
  }
}
