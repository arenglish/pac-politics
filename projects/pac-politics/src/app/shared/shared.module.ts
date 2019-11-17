import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule
} from "@angular/material";
import { RouterModule } from "@angular/router";
import { CyclePickerComponent } from "./components/cycle-picker/cycle-picker.component";

const MaterialModulesNeededForShared = [
  MatTabsModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule
];

@NgModule({
  declarations: [CyclePickerComponent],
  imports: [CommonModule, RouterModule, ...MaterialModulesNeededForShared],
  exports: [CyclePickerComponent]
})
export class SharedModule {
  constructor() {}
}
