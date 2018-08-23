import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  currentProject: Project;
  id: string;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.currentProject = this.projectService.getProject(this.id);
      })
  }

  onAddToShoppingList() {
    this.projectService.addIngredientsToShoppingList(this.currentProject.ingredients);
  }

  onEditProject() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteProject() {
    this.router.navigate(['delete'], { relativeTo: this.route });
  }

  isAuthor() {
    if (this.currentProject.authorId && this.currentProject.authorId === this.authService.uid) {
      return true;
    } else {
      return this.authService.isAdmin;
    };
  }
}
