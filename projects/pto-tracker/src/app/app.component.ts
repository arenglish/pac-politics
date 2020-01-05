import { Component } from "@angular/core";
import { LOADING_STATE, SessionService } from "./services/session.service";
import { User } from "firebase";
import { Observable } from "rxjs";
import { first, map, tap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  user$: Observable<User>;
  loggedIn$: Observable<boolean>;
  loadingState$: Observable<number>;
  LOADING_STATE = LOADING_STATE;

  constructor(private session: SessionService) {
    this.user$ = session.user$;
    this.loggedIn$ = this.user$.pipe(
      map(user => {
        console.log(user);
        return user !== null;
      })
    );
    this.loadingState$ = this.session.loadingState$;
  }

  toggleLoggedInStatus() {
    this.loggedIn$
      .pipe(
        first(),
        tap(loggedIn => {
          if (loggedIn) {
            this.session.logout();
          } else {
            this.session.login();
          }
        })
      )
      .subscribe();
  }
}
