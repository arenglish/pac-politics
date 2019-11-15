import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  BillService,
  CongressService,
  MemberService
} from "@arenglish/pro-publica/lib/services";
import { MemberStore } from "../services/member.store";
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import { PacPoliticsRoutingModule } from "../app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChamberTabsComponent } from "../components/chamber-tabs/chamber-tabs.component";
import { BillListComponent } from "../components/bill-list/bill-list.component";
import { TruncateStringPipe } from "../shared/pipes/truncate-string.pipe";
import { CyclePickerComponent } from "../components/cycle-picker/cycle-picker.component";
import { MemberSearchComponent } from "../components/member-search/member-search.component";
import { MemberBioComponent } from "../components/member-bio/member-bio.component";

@NgModule({
  declarations: [
    ChamberTabsComponent,
    BillListComponent,
    TruncateStringPipe,
    CyclePickerComponent,
    MemberSearchComponent,
    MemberBioComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    HttpClientModule,
    MatListModule,
    MatTabsModule,
    PacPoliticsRoutingModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule
  ],
  providers: [
    HttpClient,
    MemberService,
    CongressService,
    BillService,
    MemberStore
  ]
})
export class CoreModule {}
