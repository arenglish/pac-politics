import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  PRO_PUBLICA_CONFIG,
  ProPublicaConfig
} from "./pro-publica-config-token";
import { Bill } from "../models/bill.model";
import { ProPublicaResponse } from "../models/pro-publica-response";
import { ProPublicaGetService } from "./get.service";
import { CHAMBERS, ChamberTypes, Congress, Vote } from "../models";

interface VotesResult {
  chamber: ChamberTypes;
  offset: number;
  numResults: number;
  votes: Vote[];
}

interface SpecificRollCallVoteResult {
  votes: {
    vote: Vote;
  };
}

@Injectable({
  providedIn: "root"
})
export class VoteService extends ProPublicaGetService<Vote> {
  constructor(
    @Inject(PRO_PUBLICA_CONFIG) private config: ProPublicaConfig,
    private _http: HttpClient
  ) {
    super(config);
  }

  recentVotes(
    chamber: ChamberTypes = CHAMBERS.both
  ): Observable<ProPublicaResponse<VotesResult>> {
    return this.read<ProPublicaResponse<VotesResult>>({
      ...this.config,
      paths: {
        subPath: `${chamber}/votes/recent.json`
      }
    });
  }

  specificRollCallVote(
    congress: number,
    chamber: ChamberTypes,
    sessionNumber: number,
    rollCallNumber: number
  ): Observable<ProPublicaResponse<SpecificRollCallVoteResult>> {
    return this.read<ProPublicaResponse<SpecificRollCallVoteResult>>({
      ...this.config,
      paths: {
        subPath: `${congress}/${chamber}/sessions/${sessionNumber}/votes/${rollCallNumber}.json`
      }
    });
  }
}
