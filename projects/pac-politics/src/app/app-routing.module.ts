import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillsResolver } from './routing/bills.resolver';
import { PacResolver } from './routing/pac.resolver';
import { ChamberTabsComponent } from './chamber-tabs/chamber-tabs.component';

//This is my case 
const routes: Routes = [
    {
        path: '',
        redirectTo: 'pacs',
        pathMatch: 'full'
    },
    {
        path: 'pacs',
        component: ChamberTabsComponent,
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