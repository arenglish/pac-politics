import { NgModule } from "@angular/core";
import { ShellModule } from "../shell/shell.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  BillService,
  CongressService,
  MemberService
} from "@arenglish/pro-publica";
import { MemberStore } from "./services/member.store";

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
