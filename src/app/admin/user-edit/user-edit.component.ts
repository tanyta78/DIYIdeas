import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Response } from '@angular/http';

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
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.editMode = this.id != null;
    if (this.route.snapshot.url[1]) {
      this.deleteMode = this.route.snapshot.url[1].path == "delete"
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

    if (this.deleteMode) {
      //set status to deleted and when login check in users db ?!?
      //newUser.status='deleted';
      this.userService.deleteUser(this.id).subscribe(
        (res: Response) => {
          console.log(res);
          this.router.navigate(['/users']);
        }
      );
    } else if (this.editMode) {
      if (this.userForm.value['status']) {
        newUser.status = this.userForm.value.status;
      }
      if (this.userForm.value['role']) {
        newUser.role = this.userForm.value.role;
      }
      this.userService.editUser(newUser).subscribe((r) => {
        console.log(r)
        this.onCancel();
      })
    } else {
      this.userService.createUser(newUser).subscribe((r) => {
        console.log(r)
        this.onCancel();
      })
    }

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

    if (this.editMode || this.deleteMode) {
      this.userService.getById(this.id).subscribe(
        data => {
          const user = data.json();
          username = user.name;
          imageUrl = user.imageUrl;
          email = user.description;
          status = user.status;
          role = user.role;
        }
      );
    }

    this.userForm = new FormGroup({
      'username': new FormControl(username, Validators.required),
      'imageUrl': new FormControl(imageUrl, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'status': new FormControl(status),
      'role': new FormControl(role),
    });
  }

  isAdmin() {
    return this.authService.isAdmin;
  };

}
