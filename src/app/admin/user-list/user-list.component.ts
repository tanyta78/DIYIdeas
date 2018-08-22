import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  users: User [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.userService.usersChanged.subscribe(
      (newUsers: User[]) => {
        this.users = newUsers;
      }
    );

    this.userService.getAllUsers().subscribe(data=>{
     this.users=data as User[];
    });
  }

  onNewUser() {
		this.router.navigate(['new'],{relativeTo:this.route});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

}
