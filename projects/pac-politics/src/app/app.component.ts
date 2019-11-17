import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "pac-root",
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PacPoliticsComponent {}
