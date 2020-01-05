import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  AngularFireAuthGuard,
  canActivate,
  loggedIn
} from "@angular/fire/auth-guard";
import { AngularFireAuth } from "@angular/fire/auth";
import { ShellGuard } from "./guards/shell.guard";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        canActivate: [AngularFireAuthGuard],
        children: [
          {
            path: "",
            canActivate: [ShellGuard],
            loadChildren: () =>
              import("./shell/shell.module").then(m => m.ShellModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AngularFireAuthGuard, AngularFireAuth, ShellGuard]
})
export class AppRoutingModule {}
