import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
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
    private userService:UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.userService.getById(this.id).subscribe(
          (data)=>{
            this.selectedUser = data.json();
          }
        );
      
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
