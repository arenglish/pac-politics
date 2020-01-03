import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PtoYear } from '../../services/session.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'year-entry',
  templateUrl: './year-entry.component.html',
  styleUrls: ['./year-entry.component.scss']
})
export class YearEntryComponent {
  yearForm = new FormGroup({
    number: new FormControl(new Date().getFullYear()),
    allowance: new FormControl(0)
  })
  @Output('addYear') _addYear = new EventEmitter<PtoYear>();

  submitYear() {
    this._addYear.emit(this.yearForm.value);
  }

}
