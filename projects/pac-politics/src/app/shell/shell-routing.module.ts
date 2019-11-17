import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShellComponent } from "./shell.component";

const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../feature-modules/member-search/member-search.module").then(
            m => m.MemberSearchModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule {}
