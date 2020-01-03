import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  AngularFireAuthGuard,
  canActivate,
  loggedIn
} from "@angular/fire/auth-guard";
import { AngularFireAuth } from "@angular/fire/auth";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        canActivate: [AngularFireAuthGuard],
        loadChildren: () => import("./shell/shell.module").then(m => m.ShellModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AngularFireAuthGuard, AngularFireAuth]
})
export class AppRoutingModule {}
