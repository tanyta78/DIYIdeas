import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  projects:Project[];
  pageSize: number = 2;
  currentPage:number = 1;

  constructor(
    private projectService: ProjectService,
    private dataStorageServise: DataStorageService,
		private router: Router,
		private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription=this.projectService.projectsChanged.subscribe(
      (newProjects: Project[])=>{
        this.projects=newProjects;
      }
    );

    //this.dataStorageServise.getProjects();
    this.projectService.getAllProjects();
    this.projects=this.projectService.getProjects();
  }

  onNewProject() {
		this.router.navigate(['new'],{relativeTo:this.route});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
  }
  
  pageChange(page){
    this.currentPage=page;
  }
}
