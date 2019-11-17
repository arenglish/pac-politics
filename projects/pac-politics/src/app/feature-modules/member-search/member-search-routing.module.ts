import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MemberSearchPage } from "./member-search.page";
import { MemberSearchGuard } from "../../core/guards/member-search.guard";

const routes: Routes = [
  {
    path: ":chamber/:congress",
    component: MemberSearchPage,
    resolve: {
      members: MemberSearchGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MemberSearchGuard]
})
export class MemberSearchRoutingModule {}
