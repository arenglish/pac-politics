import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class UserPtoResolver implements Resolve<any> {
  constructor(private session: SessionService) {}
  resolve() {
    this.session.loadUserPto();
  }
}
