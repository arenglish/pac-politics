import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CvComponent } from './main/cv/cv.component';
import { ProjectsComponent } from './main/projects/projects.component';
import { PhotographyComponent } from './main/photography/photography.component';
import { VideosComponent } from './main/videos/videos.component';

const appRoutes: Routes = [
    {
        path: '', pathMatch: 'full',
        component: MainComponent,
    },
    {
        path: 'cv',
        component: CvComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'photography',
        component: PhotographyComponent
    },
    {
        path: 'videos',
        component: VideosComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            onSameUrlNavigation: 'reload'
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
