import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

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
  filteredStatus : string = '';
  isLogginUser;

  constructor(
    private projectService: ProjectService,
    private dataStorageServise: DataStorageService,
		private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.subscription=this.projectService.projectsChanged.subscribe(
      (newProjects: Project[])=>{
        this.projects=newProjects;
      }
    );

    //this.dataStorageServise.getProjects();
    this.projectService.getAllProjects();
    this.projects=this.projectService.getProjects();
    this.isLogginUser=this.authService.isAuthenticated();
  }

  onNewProject() {
		this.router.navigate(['new'],{relativeTo:this.route});
  }
  
  onMyProjects() {
	  this.projectService.getMyProjects();
    this.projects=this.projectService.getProjects();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
  }
  
  pageChange(page){
    this.currentPage=page;
  }
}
