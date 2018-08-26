import { Component, OnInit } from '@angular/core';
import { User } from '../../admin/user.model';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loggedInUser: User;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    let id = this.authService.uid;
    this.authService.getById(id).subscribe((res) => {
      this.loggedInUser = res;
      this.initForm();
    })
  }

  onSubmit() {

    this.loggedInUser.email = this.userForm.value['email'];
    this.loggedInUser.username = this.userForm.value['username'];
    this.loggedInUser.imageUrl = this.userForm.value['imageUrl']

    this.authService.updateUser(this.loggedInUser);

    this.authService.editUser(this.loggedInUser).subscribe(
      (res: Response) => {
        this.toastr.success(`User profile succesfully edited`, 'Success!');

        this.onCancel();
      })

  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  private initForm() {
    let username = this.loggedInUser.username;
    let imageUrl = this.loggedInUser.imageUrl;
    let email = this.loggedInUser.email;

    this.userForm = new FormGroup({
      'username': new FormControl(username, Validators.required),
      'imageUrl': new FormControl(imageUrl, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.email])
    });

  }

  get username() { return this.userForm.get('username'); }
  get imageUrl() { return this.userForm.get('imageUrl'); }
  get email() { return this.userForm.get('email'); }

}
