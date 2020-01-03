import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { HomeComponent } from '../components/home/home.component';
import { YearCardComponent } from '../components/year-card/year-card.component';
import { ShellRoutingModule } from './shell-routing.module';
import { PtoEntryComponent } from '../components/pto-entry/pto-entry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { YearEntryComponent } from '../components/year-entry/year-entry.component';



@NgModule({
  declarations: [ShellComponent, HomeComponent, YearCardComponent, PtoEntryComponent, YearEntryComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    ReactiveFormsModule
  ]
})
export class ShellModule { }
