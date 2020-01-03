import { Component, OnInit } from '@angular/core';
import { PtoYear, SessionService, UserPto } from '../services/session.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styles: [`
    .shell-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
  `]
})
export class ShellComponent {
  showAddYear = false;
  constructor(public session: SessionService) { }

  addYearButtonClicked() {
    this.showAddYear = true;
  }

  addYear(year: PtoYear) {
    this.showAddYear = false;
    this.session.addYear({
      ...year,
      entries: []
    });
  }
}
