import { Component } from "@angular/core";
import { PtoYear, SessionService } from "../services/session.service";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"]
})
export class ShellComponent {
  showAddYear = false;
  constructor(public session: SessionService) {}

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
