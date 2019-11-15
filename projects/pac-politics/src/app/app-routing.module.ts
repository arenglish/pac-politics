import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChamberTabsComponent } from "./components/chamber-tabs/chamber-tabs.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "pacs",
    pathMatch: "full"
  },
  {
    path: "pacs",
    component: ChamberTabsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PacPoliticsRoutingModule {}
