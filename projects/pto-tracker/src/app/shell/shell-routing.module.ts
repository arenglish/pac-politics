import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomeComponent } from '../components/home/home.component';
import { UserPtoResolver } from '../resolvers/user-pto.resolver';
import { YearEntryComponent } from '../components/year-entry/year-entry.component';
import { ShellComponent } from './shell.component';


const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        resolve: {
          userPto: UserPtoResolver
        },
        component: HomeComponent,
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AngularFireAuthGuard,
    AngularFireAuth
  ]
})
export class ShellRoutingModule { }
