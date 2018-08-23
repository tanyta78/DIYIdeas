import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  users: User [];
  pageSize: number = 3;
  currentPage:number = 1;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.authService.usersChanged.subscribe(
      (newUsers: User[]) => {
        this.users = newUsers;
      }
    );
    // this.dataStorageServise.getProjects();
    // this.projects=this.projectService.getProjects();
    this.authService.getAllUsers();
    this.users=this.authService.getUsers();
  }

  
  onNewUser() {
		this.router.navigate(['new'],{relativeTo:this.route});
}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
  }
  
  pageChange(page){
    this.currentPage=page;
  }

}
