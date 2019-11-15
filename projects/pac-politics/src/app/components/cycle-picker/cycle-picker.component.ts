import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CongressCycle, CongressionalNumber } from "@arenglish/pro-publica";
import { StoreService } from "../../services/store.service";

@Component({
  selector: "pac-cycle-picker",
  templateUrl: "./cycle-picker.component.html",
  styleUrls: ["./cycle-picker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CyclePickerComponent {
  cycles: CongressCycle[];
  selectedCycle: CongressCycle;

  constructor(private store: StoreService) {
    const year = new Date().getFullYear();
    const congress = new CongressionalNumber(year);
    this.cycles = congress.cycles.reverse();

    this.setCycle(this.cycles[0]);
  }

  setCycle(cycle: CongressCycle) {
    this.selectedCycle = cycle;
    this.store.set.selectedCongressSession(cycle.congress);
  }
}
