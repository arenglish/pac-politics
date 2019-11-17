import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from "@angular/core";
import { CongressCycle, CongressionalNumber } from "@arenglish/pro-publica";
import { StoreService } from "../../../core/services/store.service";

@Component({
  selector: "pac-cycle-picker",
  templateUrl: "./cycle-picker.component.html",
  styleUrls: ["./cycle-picker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CyclePickerComponent {
  cycles: CongressCycle[];
  selectedCycle: CongressCycle;

  @Output("congressionalSessionSelected")
  congressionalSessionSelected = new EventEmitter<number>();

  constructor() {
    const year = new Date().getFullYear();
    const congress = new CongressionalNumber(year);
    this.cycles = congress.cycles.reverse();

    this.setCycle(this.cycles[0]);
  }

  setCycle(cycle: CongressCycle) {
    this.selectedCycle = cycle;
    this.congressionalSessionSelected.emit(cycle.congress);
  }
}
