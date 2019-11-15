import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  PRO_PUBLICA_CONFIG,
  ProPublicaConfig
} from "./pro-publica-config-token";
import { CHAMBERS, ChamberTypes, Member } from "../models/member.model";
import { ProPublicaResponse } from "../models/pro-publica-response";
import { Congress } from "../models/congress.model";
import { ProPublicaGetService } from "./get.service";

@Injectable({
  providedIn: "root"
})
export class CongressService extends ProPublicaGetService<Congress> {
  constructor(
    @Inject(PRO_PUBLICA_CONFIG) private config: ProPublicaConfig,
    private _http: HttpClient
  ) {
    super(config);
  }

  getCongressByNumber(
    congress: number,
    chamber: ChamberTypes = CHAMBERS.both
  ): Observable<Congress> {
    return this.getNestedResult(
      "results.0",
      this.list<ProPublicaResponse<Congress[]>>({
        ...this.config,
        paths: {
          subPath: `${congress}/${chamber}/members.json`
        }
      })
    );
  }
}
