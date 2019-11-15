import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "pac-root",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PacPoliticsComponent {}
