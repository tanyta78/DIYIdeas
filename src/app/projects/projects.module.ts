import { NgModule } from "@angular/core";
import { ProjectsComponent } from "./projects.component";
import { ProjectListComponent } from "./project-list/project-list.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { ProjectItemComponent } from "./project-list/project-item/project-item.component";
import { ProjectStartComponent } from "./project-start/project-start.component";
import { ProjectEditComponent } from "./project-edit/project-edit.component";
import { ReactiveFormsModule } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations:[
		ProjectsComponent,
		ProjectStartComponent,
		ProjectListComponent,
		ProjectEditComponent,
		ProjectDetailComponent,
		ProjectItemComponent,
	],
	imports:[
		CommonModule,
		ReactiveFormsModule,
		ProjectsRoutingModule,
		SharedModule
	]
})
export class ProjectsModule{

}