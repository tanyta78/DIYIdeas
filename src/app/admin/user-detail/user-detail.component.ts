import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  selectedUser:User;
  id:string;

  constructor(
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['db'];
        this.authService.getById(this.id).subscribe(
          (data)=>{
            // console.log(data)
            this.selectedUser = data.json() as User;
            console.log(this.selectedUser)
          }
        );
      })
  }

  onEditUser() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteUser() {
    this.router.navigate(['delete'], { relativeTo: this.route });
  }

  isAdmin() {
      return this.authService.isAdmin;
    };

}
