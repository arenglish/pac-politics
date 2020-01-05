import { Component } from "@angular/core";
import {
  LOADING_STATE,
  SessionService,
  UserPto
} from "../../services/session.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  LOADING_STATE = LOADING_STATE;
  ptoInfo$: Observable<UserPto>;
  loadingState$: Observable<number>;
  trackByIndex = (index, item) => index;

  constructor(private session: SessionService) {
    this.ptoInfo$ = this.session.userPto$;
    this.loadingState$ = this.session.loadingState$;
  }
}
