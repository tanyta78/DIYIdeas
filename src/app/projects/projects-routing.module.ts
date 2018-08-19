import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/auth-guard.service";
import { ProjectsComponent } from "./projects.component";
import { ProjectStartComponent } from "./project-start/project-start.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { ProjectEditComponent } from "./project-edit/project-edit.component";

const projectsRoutes: Routes = [
	{ path: '', component: ProjectsComponent ,children:[
		{ path: '', component: ProjectStartComponent },
		{ path: 'new', component: ProjectStartComponent, canActivate: [AuthGuard] },
		{ path: ':id', component: ProjectDetailComponent },
		{ path: ':id/edit', component: ProjectEditComponent, canActivate: [AuthGuard] }
]}];

@NgModule({
	imports: [RouterModule.forChild(projectsRoutes)],
	exports: [RouterModule]
})
export class ProjectsRoutingModule { }