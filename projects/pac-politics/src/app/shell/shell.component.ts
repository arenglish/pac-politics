import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StoreService } from "../services/store.service";

@Component({
  selector: "pac-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  title = "pac-politics";
  mobileBrowser = false;
  showMenu = false;

  constructor(private route: ActivatedRoute, private store: StoreService) {
    console.log(this.route.snapshot.data);
    this.mobileBrowser = (<any>window).systemVars.isMobileBrowser;

    this.store.setMobileBrowser(this.mobileBrowser);
    if (this.mobileBrowser) {
      this.showMenu = true;
    }
  }
}
