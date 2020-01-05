import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShellComponent } from "./shell.component";
import { HomeComponent } from "../components/home/home.component";
import { YearCardComponent } from "../components/year-card/year-card.component";
import { ShellRoutingModule } from "./shell-routing.module";
import { PtoEntryComponent } from "../components/pto-entry/pto-entry.component";
import { ReactiveFormsModule } from "@angular/forms";
import { YearEntryComponent } from "../components/year-entry/year-entry.component";
import { PlusButtonComponent } from "../components/plus-button/plus-button.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ShellComponent,
    HomeComponent,
    YearCardComponent,
    PtoEntryComponent,
    YearEntryComponent,
    PlusButtonComponent
  ],
  imports: [CommonModule, ShellRoutingModule, ReactiveFormsModule, SharedModule]
})
export class ShellModule {}
