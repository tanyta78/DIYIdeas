import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

import { User } from '../user.model';
import { Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: string;
  submitButtonText: string = 'Save';
  editMode: boolean = false;
  deleteMode: boolean = false;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private toastr:ToastrService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['db'];
    
    if (this.route.snapshot.url[2]) {
      this.deleteMode = this.route.snapshot.url[2].path == "delete"
      this.editMode =this.route.snapshot.url[2].path == "edit"
    };
    if (this.deleteMode) {
      this.submitButtonText = 'Delete'
    } else if (this.editMode) {
      this.submitButtonText = 'Edit'
    }
    this.initForm();
  }

  onSubmit() {
    const newUser = new User(
      this.authService.uid,
      this.userForm.value['email'],
      this.userForm.value['username'],
      this.userForm.value['imageUrl']
    );

    if (this.userForm.value['status']) {
      newUser.status = this.userForm.value.status;
    }
    if (this.userForm.value['role']) {
      newUser.role = this.userForm.value.role;
    }

    if (this.deleteMode) {
      //set status to deleted and when login check in users db ?!?
      //newUser.status='deleted';
      newUser.id= this.route.snapshot.params['db'];
      newUser.status='deleted';
      this.authService.updateUser(newUser);
      this.authService.editUser(newUser).subscribe(
        (res: Response) => {
          this.toastr.success(`User succesfully deleted`, 'Success!');
          this.onCancel();
        }
      );
    } else if (this.editMode) {
      newUser.id= this.route.snapshot.params['db'];
      newUser.role=this.userForm.value['role'];
      newUser.status=this.userForm.value['status'];
      this.authService.updateUser(newUser);
     
      this.authService.editUser(newUser).subscribe( 
        (res: Response) => {
          this.toastr.success(`User profile succesfully edited`, 'Success!');

        this.onCancel();
      })
    } else{
      //create new user in firebase and add it to db users
      let password = this.userForm.value['password'];
      this.authService.addUserAndSetUserUid(newUser,password);
    
      this.onCancel();
    }

    this.onCancel();

  }
  
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  private initForm() {
    let username = '';
    let imageUrl = '';
    let email = '';
    let status = '';
    let role = '';
    let password = '';

    if (this.editMode || this.deleteMode) {
      this.authService.getById(this.id).subscribe(
        user => {
          // const user = data.json() as User;
          console.log(user)
          username = user.username;
          imageUrl = user.imageUrl;
          email = user.email;
          status = user.status;
          role = user.role;

          this.userForm = new FormGroup({
            'username': new FormControl(username, Validators.required),
            'imageUrl': new FormControl(imageUrl, Validators.required),
            'email': new FormControl(email, [Validators.required, Validators.email]),
            'status': new FormControl(status),
            'role': new FormControl(role),
          });
        }
      );
    }else{
      this.userForm = new FormGroup({
        'username': new FormControl(username, Validators.required),
        'imageUrl': new FormControl(imageUrl, Validators.required),
        'email': new FormControl(email, [Validators.required, Validators.email]),
        'status': new FormControl(status),
        'role': new FormControl(role),
        'password': new FormControl(password,[Validators.required]),
      });
    }
  }

  isAdmin() {
    return this.authService.isAdmin;
  };

}
