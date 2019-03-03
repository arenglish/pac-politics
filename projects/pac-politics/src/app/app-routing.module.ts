import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacPoliticsComponent } from './app.component';
import { BillsResolver } from './routing/bills.resolver';
import { PacResolver } from './routing/pac.resolver';
import { SideNavComponent } from './side-nav/side-nav.component';

//This is my case 
const routes: Routes = [
    {
        path: '',
        redirectTo: 'pacs',
        pathMatch: 'full'
    },
    {
        path: 'pacs',
        component: SideNavComponent,
        resolve: {
            bills: BillsResolver,
            pacs: PacResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        BillsResolver,
        PacResolver
    ]
})
export class PacPoliticsRoutingModule { }