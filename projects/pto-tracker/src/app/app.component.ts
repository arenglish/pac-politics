import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User>;

  constructor(private session: SessionService) {
    this.user$ = session.user$;
  }

  loginButtonClicked() {
    this.session.login();
  }

  logoutButtonClicked() {
    this.session.logout();
  }
}
