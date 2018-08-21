import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  id: number;
  editMode = false;
  projectForm: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private projectService: ProjectService, 
    private router: Router,
   ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  onSubmit() {
    const newProject = new Project(
      this.projectForm.value['name'],
      this.projectForm.value['description'],
      this.projectForm.value['imageUrl'],
      this.projectForm.value['ingredients']
    );
    //can use only value because of equal names - use this in additing new project

    if (this.editMode) {
      this.projectService.updateProject(this.id, newProject);
      this.projectService.editProjectOnDatabase(this.id, newProject) .subscribe((r) => {
        console.log(r)
         this.onCancel();
       })
    } else {
      this.projectService.addProject(this.projectForm.value);
      this.projectService.addProjectToDatabase(newProject) .subscribe((r) => {
       console.log(r)
        this.onCancel();
      })
    }

  }

  onAddIngredient() {
    (<FormArray>this.projectForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,
        Validators.pattern(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/)])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.projectForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  getControls() {
    return (<FormArray>this.projectForm.get('ingredients')).controls;
  }

  private initForm(){
    let projectName='';
    let projectImageUrl='';
    let projectDescription = '';
    let projectIngredients = new FormArray ([]);

    if(this.editMode){
      const project = this.projectService.getProject(this.id);
      projectName=project.name;
      projectImageUrl=project.imageUrl;
      projectDescription=project.description;
      if(project['ingredients']){
        for (const ing of project.ingredients) {
          projectIngredients.push(
            new FormGroup({
              name:new FormControl(ing.name,Validators.required),
              amount:new FormControl(ing.amount,[Validators.required,
              Validators.pattern(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/)])
            })
          );
        }
      }
    }

    this.projectForm = new FormGroup({
      'name': new FormControl(projectName,Validators.required),
      'imageUrl': new FormControl(projectImageUrl,Validators.required),
      'description':new FormControl(projectDescription, Validators.required),
      'ingredients': projectIngredients
    });
  }

}
