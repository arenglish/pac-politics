import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { Observable, Subject } from "rxjs";
import { StoreService } from "../../services/store.service";
import { Bill } from "@arenglish/pro-publica/lib/models";

@Component({
  selector: "pac-bill-list",
  templateUrl: "./bill-list.component.html",
  styleUrls: ["./bill-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillListComponent implements OnInit {
  @Input() chamber: "house" | "senate" = "house";
  bills$: Observable<Bill[]>;
  selectedBillInfo$: Subject<Bill> = new Subject();

  constructor(private store: StoreService) {}

  ngOnInit() {}
}
