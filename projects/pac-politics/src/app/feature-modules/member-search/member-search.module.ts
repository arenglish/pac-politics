import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MemberSearchPage } from "./member-search.page";
import { SharedModule } from "../../shared/shared.module";
import { MemberSearchComponent } from "./components/member-search/member-search.component";
import { MemberBioComponent } from "./components/member-bio/member-bio.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatCardModule,
  MatTabsModule
} from "@angular/material";
import { MemberSearchRoutingModule } from "./member-search-routing.module";

const MATERIAL_MODULES_FOR_MEMBER_SEARCH_MODULE = [
  MatCardModule,
  MatButtonModule,
  MatTabsModule
];

@NgModule({
  declarations: [MemberSearchPage, MemberSearchComponent, MemberBioComponent],
  imports: [
    CommonModule,
    MemberSearchRoutingModule,
    SharedModule,
    FlexLayoutModule,
    ...MATERIAL_MODULES_FOR_MEMBER_SEARCH_MODULE
  ],
  providers: []
})
export class MemberSearchModule {}
