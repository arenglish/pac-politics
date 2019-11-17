import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "../core/services/store.service";
import { first, tap } from "rxjs/operators";

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

  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private router: Router
  ) {
    console.log(this.route.snapshot.data);
    this.mobileBrowser = (<any>window).systemVars.isMobileBrowser;

    this.store.setMobileBrowser(this.mobileBrowser);
    if (this.mobileBrowser) {
      this.showMenu = true;
    }
  }

  congressSelected(congress: number) {
    this.store.selectedChamber.entities$
      .pipe(
        first(),
        tap(chamber => {
          this.router.navigateByUrl(`/${chamber}/${congress}`);
        })
      )
      .subscribe();
  }
}
