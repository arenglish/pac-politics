import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { Bill, Vote } from "@arenglish/pro-publica";
import { BehaviorSubject, Subject } from "rxjs";
import {
  IsInView,
  isScrolledIntoView
} from "@pac/app/shared/models/is-in-view.model";

@Component({
  selector: "pac-bill-group",
  templateUrl: "./bill-group-card.component.html",
  styleUrls: ["./bill-group-card.component.scss"]
})
export class BillGroupCardComponent {
  private readonly _votes$ = new BehaviorSubject<Vote[]>([]);
  readonly votes$ = this._votes$.asObservable();
  voteController = Vote;

  @Input() set votes(votes: Vote[]) {
    this._votes$.next(votes);
  }

  @Input() bill: Bill;

  @Input() title = "Bills";

  @HostBinding("style.flex") hostStyleWidth = "1 0 20em";
  @HostBinding("style.display") hostStyleDisplay = "flex";
}
