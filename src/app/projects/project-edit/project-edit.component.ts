import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  id: string;
  submitButtonText: string = 'Save';
  editMode:boolean= false;
  deleteMode:boolean= false;
  projectForm: FormGroup;
  authorId:string;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        if (this.route.snapshot.url[1]) {
          this.deleteMode = this.route.snapshot.url[1].path == "delete"
        };
        if (this.deleteMode) {
          this.submitButtonText = 'Delete'
        }else if(this.editMode){
          this.submitButtonText = 'Edit'
        }
        this.initForm();
      });
  }

  onSubmit() {
    const newProject = new Project(
      this.projectForm.value['name'],
      this.projectForm.value['description'],
      this.projectForm.value['imageUrl'],
      this.projectForm.value['ingredients'],
      this.authService.uid
    );
    //can use only value because of equal names - use this in additing new project
    if (this.deleteMode) {
      
      this.projectService.deleteProject(this.id);
   
      this.dataStorageService.storeProjects().subscribe(
        (res: Response) => {
          console.log(res);
          this.toastr.success(`Project succesfully deleted`, 'Success!');

          this.router.navigate(['/projects']);
         // this.onCancel();
        }
      );
    } else if (this.editMode) {
      newProject.id=this.id;
      newProject.authorId=this.authorId;
      this.projectService.updateProject(newProject);
      this.projectService.editProjectOnDatabase(this.id, newProject).subscribe((r) => {
        console.log(r);
        this.toastr.success(`Project succesfully edited`, 'Success!');

        this.onCancel();
      })
    } else {
      this.projectService.addProject(newProject);
      this.projectService.addProjectToDatabase(newProject).subscribe((r) => {
        console.log(r)
        this.toastr.success(`Project succesfully created`, 'Success!');

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

  private initForm() {
    let projectName = '';
    let projectImageUrl = '';
    let projectDescription = '';
    let projectIngredients = new FormArray([]);

    if (this.editMode || this.deleteMode) {
      const project = this.projectService.getProject(this.id);
      projectName = project.name;
      projectImageUrl = project.imageUrl;
      projectDescription = project.description;
      this.authorId=project.authorId;
      if (project['ingredients']) {
        for (const ing of project.ingredients) {
          projectIngredients.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [Validators.required,
              Validators.pattern(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/)])
            })
          );
        }
      }
    }

    this.projectForm = new FormGroup({
      'name': new FormControl(projectName, Validators.required),
      'imageUrl': new FormControl(projectImageUrl, Validators.required),
      'description': new FormControl(projectDescription, Validators.required),
      'ingredients': projectIngredients
    });
  }

  get name() { return this.projectForm.get('name'); }
  get imageUrl() { return this.projectForm.get('imageUrl'); }
  get description() { return this.projectForm.get('description'); }

}
