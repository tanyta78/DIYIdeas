import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

	subscription: Subscription;
	// projects:Observable<Project[]>;
	projects: Project[];


	constructor(
		private projectService: ProjectService,
		private router: Router,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.subscription = this.projectService.projectsChanged.subscribe(
			(newRecipes: Project[]) => {
				this.projects = newRecipes;
			}
		);


		this.projects = this.projectService.getAllProjects();


	}

	onNewProject() {
		this.router.navigate(['new'], { relativeTo: this.route });
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
