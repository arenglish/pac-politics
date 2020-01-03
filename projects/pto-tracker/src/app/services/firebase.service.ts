import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from 'firebase';
import { first, switchMap } from 'rxjs/operators';
import { UserPto } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user$: Observable<User>;
  userPto$: Observable<UserPto>;

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) {
    this.user$ = this.fireAuth.user;
    this.userPto$ = this.user$.pipe(
      switchMap(user => {
        if (user) {
          const userDoc = this.firestore.doc<UserPto>('users/' + user.uid);
          return userDoc.valueChanges();
        } else {
          return null;
        }
      })
    )
  }

  getUsersCollection() {
    return this.firestore.collection('users').snapshotChanges();
  }

  updateUserDocument(userPto: UserPto) {
    return this.user$.pipe(
      first(),
      switchMap(user => {
        return from(this.firestore.collection('users').doc(user.uid).set(userPto, { merge: true }));
      })
    ).subscribe();
  }
}
