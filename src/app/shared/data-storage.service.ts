import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { ProjectService } from "../projects/project.service";
import { Project } from "../projects/project.model";
import { map } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
	constructor(
		private http: Http,
		private projectService: ProjectService,
		private authService: AuthService) { }

	storeProjects() {
		const token = this.authService.getToken();
		return this.http.put('https://diy-ideas-e2852.firebaseio.com/projects.json?auth='+token, this.projectService.getProjects());
	}

	getProjects() {
		//const token = this.authService.getToken();
		// this.http.get('https://diy-ideas-e2852.firebaseio.com/projects.json?auth='+token)
		this.http.get('https://diy-ideas-e2852.firebaseio.com/projects.json')
			.pipe(map(
				(res: Response) => {
					const ids = Object.keys(res);
					console.log(res);
					console.log(ids);

					const projects : Project[] = res.json();
					console.log(projects);
					for (const project of projects) {
						if(project==null)continue;
						if (!project['ingredients']) {
							project['ingredients'] = [];
						}
					}
					console.log(projects);
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