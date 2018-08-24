import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ProjectStartComponent } from './project-start/project-start.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { MyProjectsComponent } from './my-projects/my-projects.component';

const projectsRoutes: Routes = [
  {
    path: '', component: ProjectsComponent, children: [
      { path: '', component: ProjectStartComponent },
      { path: 'new', component: ProjectEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: ProjectDetailComponent },
      { path: ':id/edit', component: ProjectEditComponent, canActivate: [AuthGuard] },
      { path: ':id/delete', component: ProjectEditComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path:'myProjects',component: MyProjectsComponent, canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
