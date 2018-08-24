import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectStartComponent } from './project-start/project-start.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectItemComponent } from './project-list/project-item/project-item.component';


@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    ProjectsRoutingModule,
    SharedModule
  ],
  declarations: [
    ProjectsComponent, 
    ProjectStartComponent, 
    ProjectListComponent, 
    ProjectEditComponent, 
    ProjectDetailComponent, 
    ProjectItemComponent, 
  ]
})
export class ProjectsModule { }
