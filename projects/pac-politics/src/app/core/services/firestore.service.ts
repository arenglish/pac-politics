import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { from, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FirestoreService {
  db: firebase.firestore.Firestore;
  constructor() {
    // Initialize Cloud Firestore through Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyBp3TBY_FY4wYHYndD5ZbqjzJ--dmYe6mo",
      authDomain: "pac-politics.firebaseapp.com",
      projectId: "pac-politics"
    });

    this.db = firebase.firestore();
  }

  getPacs() {
    return from(this.db.collection("pacs").get()).pipe(
      map((querySnapshot: any) => {
        return querySnapshot.docs.map(doc => doc.data());
      }),
      catchError(err => {
        console.log("Error getting document:", err);
        return of(err);
      })
    );
  }
}
