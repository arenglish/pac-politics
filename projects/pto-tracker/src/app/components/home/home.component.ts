import { Component } from '@angular/core';
import { SessionService, UserPto } from '../../services/session.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ptoInfo$: Observable<UserPto>;
  trackByIndex = (index, item) => index;

  constructor(private session: SessionService) {
    this.ptoInfo$ = this.session.userPto$;

    this.ptoInfo$.subscribe(res => {
      console.log(res);
      if (res) {
        console.log(res.years);
      }
    })
  }
}
