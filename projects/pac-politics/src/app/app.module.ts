import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { PacPoliticsComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PacPoliticsRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [PacPoliticsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    PacPoliticsRoutingModule
  ],
  providers: [],
  bootstrap: [PacPoliticsComponent]
})
export class PacPoliticsModule {
  constructor() {}
}
