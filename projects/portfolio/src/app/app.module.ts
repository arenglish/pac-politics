import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WindowCardComponent } from './window-card/window-card.component';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatSidenavModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CvComponent } from './main/cv/cv.component';
import { ProjectsComponent } from './main/projects/projects.component';
import { PhotographyComponent } from './main/photography/photography.component';
import { VideosComponent } from './main/videos/videos.component';
import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    WindowCardComponent,
    MainComponent,
    CvComponent,
    ProjectsComponent,
    PhotographyComponent,
    VideosComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    MatCardModule,
    FlexLayoutModule,
    MatSidenavModule,
    MarkdownModule
  ],
  providers: [
    MarkdownService,
    MarkedOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
