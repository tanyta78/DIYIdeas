import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  currentProject: Project;
  id:number;

  constructor(
    private projectService: ProjectService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params:Params)=>{
        this.id=+params['id'];
        this.currentProject = this.projectService.getProject(this.id);
      })
  }

  onAddToShoppingList(){
		this.projectService.addIngredientsToShoppingList(this.currentProject.ingredients);
	}

  onEditProject(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onDeleteProject(){
    this.projectService.deleteProject(this.id);
    // this.projectService.deleteProjectOnDatabase(this.id).subscribe((r) => {
    //   this.dataStorageService.storeProjects();
    //   this.router.navigate(['/projects']);
    
    //  })
    this.dataStorageService.storeProjects().subscribe(
      (res: Response) => {
        console.log(res);
        this.router.navigate(['/projects']);
      }
    );
   
    }
}
