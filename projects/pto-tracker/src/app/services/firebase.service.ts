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
  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) {
    this.user$ = this.fireAuth.user;
  }

  getUser() {
    return this.user$;
  }

  getUsersCollection() {
    return this.firestore.collection('users').snapshotChanges();
  }

  getUserDocument() {
    return this.user$.pipe(
      first(),
      switchMap(user => {
        const userDoc = this.firestore.doc('users/' + user.uid);
        return userDoc.snapshotChanges();
      })
    )
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
