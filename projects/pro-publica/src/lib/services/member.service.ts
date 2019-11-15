import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  PRO_PUBLICA_CONFIG,
  ProPublicaConfig
} from "./pro-publica-config-token";
import { ProPublicaGetService } from "./get.service";
import { CHAMBERS, ChamberTypes, Member } from "../models/member.model";
import { ProPublicaResponse } from "../models/pro-publica-response";
import { Congress } from "../models";

@Injectable({
  providedIn: "root"
})
export class MemberService extends ProPublicaGetService<Member> {
  constructor(
    @Inject(PRO_PUBLICA_CONFIG) private config: ProPublicaConfig,
    private _http: HttpClient
  ) {
    super(config);
  }

  // getRecentVotes(chamber: Chamber = 'house'): Observable<Vote[]> {
  //   const url = `${this.config.host}/${chamber}/votes/recent.json`;
  //
  //   return this.getNestedResult('results.votes', this.get<ProPublicaResponse<{ votes: Vote[] }>>(url));
  // }

  membersCurrentByStateDistrict(
    state: string,
    chamber: ChamberTypes = CHAMBERS.both
  ): Observable<ProPublicaResponse<any>> {
    return super.read<ProPublicaResponse<any>>({
      ...this.config,
      paths: {
        subPath: `${chamber}/${state}/current.json`
      }
    });
  }

  membersListByCongress(
    congress: number,
    chamber: ChamberTypes = CHAMBERS.both
  ): Observable<ProPublicaResponse<Congress[]>> {
    return this.read<ProPublicaResponse<Congress[]>>({
      ...this.config,
      paths: {
        subPath: `${congress}/${chamber}/members.json`
      }
    });
  }
}
