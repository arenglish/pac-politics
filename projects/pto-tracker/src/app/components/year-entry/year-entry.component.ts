import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Pto, PtoYear } from "../../services/session.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "year-entry",
  templateUrl: "./year-entry.component.html",
  styleUrls: ["./year-entry.component.scss"]
})
export class YearEntryComponent {
  yearForm = new FormGroup({
    number: new FormControl(),
    allowance: new FormControl()
  });
  @Output("addYear") _addYear = new EventEmitter<PtoYear>();

  submitYear() {
    const value: PtoYear = {
      number: this.yearForm.value.number || new Date().getFullYear(),
      allowance: this.yearForm.value.allowance || 0,
      entries: [] as Pto[]
    };

    this._addYear.emit(value);
  }
}
