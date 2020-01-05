import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { LOADING_STATE, SessionService } from "../services/session.service";
import { of } from "rxjs";

@Injectable()
export class ShellGuard implements CanActivate {
  constructor(private session: SessionService) {}

  canActivate() {
    console.log("running home guard");
    this.session.setLoadingState(LOADING_STATE.WAITING);
    return of(true);
  }
}
