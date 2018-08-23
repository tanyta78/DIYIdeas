import { Injectable } from "@angular/core";

import { ProjectService } from "../projects/project.service";
import { Project } from "../projects/project.model";
import { map } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataStorageService {
	constructor(
		private http: HttpClient,
		private projectService: ProjectService,
		private authService: AuthService) { }

	storeProjects() {
		return this.http.put('https://diy-ideas-e2852.firebaseio.com/projects.json', this.projectService.getProjects());
	}

	getProjects() {
		this.http.get<Project[]>('https://diy-ideas-e2852.firebaseio.com/projects.json')
			.pipe(map(
				(projects) => {

					for (const project of projects) {
						if(project==null)continue;
						if (!project['ingredients']) {
							project['ingredients'] = [];
						}
					}

					return projects;
				}
			))
			.subscribe(
				(projects: Project[]) => {
					this.projectService.setProjects(projects);
				}
			);
	}
}