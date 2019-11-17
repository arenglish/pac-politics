import { NgModule } from "@angular/core";
import { ShellModule } from "../shell/shell.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  BillService,
  CongressService,
  MemberService
} from "@arenglish/pro-publica";
import { MemberStore } from "./services/member.store";
import * as LogRocket from "logrocket";
LogRocket.init("e39dmo/pac-politics");

@NgModule({
  declarations: [],
  imports: [ShellModule, HttpClientModule],
  providers: [
    HttpClient,
    MemberService,
    CongressService,
    BillService,
    MemberStore
  ]
})
export class CoreModule {}
