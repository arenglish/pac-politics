import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatExpansionModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
} from "@angular/material";
import { PacPoliticsComponent } from "./app.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ChamberTabsComponent } from "./components/chamber-tabs/chamber-tabs.component";
import { BillListComponent } from "./components/bill-list/bill-list.component";
import { TruncateStringPipe } from "./shared/pipes/truncate-string.pipe";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PacPoliticsRoutingModule } from "./app-routing.module";
import { CyclePickerComponent } from "./components/cycle-picker/cycle-picker.component";
import * as LogRocket from "logrocket";
import { MemberSearchComponent } from "./components/member-search/member-search.component";
import {
  BillService,
  CongressService,
  MemberService
} from "@arenglish/pro-publica";
import { MemberBioComponent } from "./components/member-bio/member-bio.component";
import { MemberStore } from "./services/member.store";
import { ShellComponent } from "./shell/shell.component";
LogRocket.init("e39dmo/pac-politics");

@NgModule({
  declarations: [PacPoliticsComponent, ShellComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [PacPoliticsComponent]
})
export class PacPoliticsModule {
  constructor() {}
}
