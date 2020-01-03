import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pto, SessionService } from '../../services/session.service';

@Component({
  selector: 'app-year-card',
  templateUrl: './year-card.component.html',
  styleUrls: ['./year-card.component.scss']
})
export class YearCardComponent {
  @Input() year: string = '';
  @Input() yearAllowance: number = 0;
  @Input() yearCarryover: number = 0;
  @Input() entries: Pto[] = [];

  ptoEntry: boolean = false;

  constructor(private session: SessionService) {}

  addPtoButtonClicked() {
    this.ptoEntry = true;
  }

  deletePtoButtonClicked(index: number) {
    this.session.deletePto(index, this.year);
  }

  addPto(pto: Pto) {
    this.ptoEntry = false;
    this.session.addPto(pto, this.year);
  }
}
