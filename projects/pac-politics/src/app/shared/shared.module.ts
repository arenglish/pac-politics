import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule
} from "@angular/material";
import { RouterModule } from "@angular/router";
import { CyclePickerComponent } from "./components/cycle-picker/cycle-picker.component";
import { BillListComponent } from "@pac/app/shared/components/bill-list/bill-list.component";
import { BillGroupCardComponent } from "./components/bill-group-card/bill-group-card.component";
import { ScrollContainerDirective } from "./directives/dom-change.directive";
import { FlexLayoutModule } from "@angular/flex-layout";

const MaterialModulesNeededForShared = [
  MatTabsModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule
];

@NgModule({
  declarations: [
    CyclePickerComponent,
    BillListComponent,
    BillGroupCardComponent,
    ScrollContainerDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ...MaterialModulesNeededForShared
  ],
  exports: [
    CyclePickerComponent,
    BillListComponent,
    BillGroupCardComponent,
    ScrollContainerDirective
  ]
})
export class SharedModule {
  constructor() {}
}
