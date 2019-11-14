import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSidenavModule, MatSidenavContainer, MatListModule, MatTabsModule, MatExpansionModule, MatIconModule, MatButtonModule, MatTooltipModule, MatMenuModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { UsMapModule } from 'angular-us-map';
import { PacPoliticsComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProPublicaService } from './services/pro-publica.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChamberTabsComponent } from './chamber-tabs/chamber-tabs.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { TruncateStringPipe } from './pipes/truncate-string.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FirestoreService } from './services/firestore.service';
import { PacPoliticsRoutingModule } from './app-routing.module';
import { CyclePickerComponent } from './cycle-picker/cycle-picker.component';
import * as LogRocket from 'logrocket';
import { MemberSearchComponent } from './member-search/member-search.component';
LogRocket.init('e39dmo/pac-politics');

@NgModule({
    declarations: [
        PacPoliticsComponent,
        SideNavComponent,
        ChamberTabsComponent,
        BillListComponent,
        TruncateStringPipe,
        CyclePickerComponent,
        MemberSearchComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        UsMapModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
        HttpClientModule,
        MatListModule,
        MatTabsModule,
        PacPoliticsRoutingModule,
        MatExpansionModule,
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule
    ],
    providers: [
        HttpClient,
        ProPublicaService,
        FirestoreService
    ],
    bootstrap: [PacPoliticsComponent]
})
export class PacPoliticsModule {
    constructor(private db: FirestoreService) {}
}
