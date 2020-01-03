import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pto, SessionService } from '../../services/session.service';

@Component({
  selector: 'pto-entry',
  templateUrl: './pto-entry.component.html',
  styleUrls: ['./pto-entry.component.scss']
})
export class PtoEntryComponent {
  ptoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    days: new FormControl(0)
  });

  @Output('ptoSubmitted') _ptoSubmitted = new EventEmitter<Pto>()

  constructor(private session: SessionService) {}

  addButtonClicked() {
    this._ptoSubmitted.emit(this.ptoForm.value);
    this.ptoForm.reset();
  }
}
