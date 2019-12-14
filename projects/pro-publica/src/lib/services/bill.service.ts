import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  PRO_PUBLICA_CONFIG,
  ProPublicaConfig
} from "./pro-publica-config-token";
import { Bill, BillType } from "../models/bill.model";
import { ProPublicaResponse } from "../models/pro-publica-response";
import { ProPublicaGetService } from "./get.service";
import { CHAMBERS, ChamberTypes, Congress } from "../models";

type BillsResponse = ProPublicaResponse<{ results: { bills: Bill[] }[] }>;

@Injectable({
  providedIn: "root"
})
export class BillService extends ProPublicaGetService<Bill> {
  constructor(
    @Inject(PRO_PUBLICA_CONFIG) private config: ProPublicaConfig,
    private _http: HttpClient
  ) {
    super(config);
  }

  getRecentBills(
    congress: number,
    chamber: ChamberTypes = CHAMBERS.both,
    type = "introduced"
  ): Observable<BillsResponse> {
    return this.read<BillsResponse>({
      ...this.config,
      paths: {
        subPath: `${congress}/${chamber}/bills/${type}.json`
      }
    });
  }

  recentBillsByASpecificMember(
    memberId: string,
    type: BillType
  ): Observable<BillsResponse> {
    return this.read<BillsResponse>({
      ...this.config,
      paths: {
        subPath: `members/${memberId}/bills/${type}.json`
      }
    });
  }

  getBillDetails(
    billID: string,
    congress: number
  ): Observable<ProPublicaResponse<Bill[]>> {
    return this.read<ProPublicaResponse<Bill[]>>({
      ...this.config,
      paths: {
        subPath: `${congress}/bills/${billID}.json`
      }
    });
  }
}
