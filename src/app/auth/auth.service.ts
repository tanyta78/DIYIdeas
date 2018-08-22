import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UserService } from "../admin/user.service";

@Injectable()
export class AuthService {
	token: string;
	//isAdmin: boolean = false;
	isAdmin: boolean = true;

	uid: string;

	constructor(
		private router: Router,
	//	private userService: UserService
	) { }

	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(data => {
				console.log(data);
				//TODO: save new created user in users db collection
			})
			.catch(
				error => console.log(error)
			);
	}

	signinUser(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(res => {
				this.router.navigate(['/']);
				this.uid = res.user.uid;
				//this.isAdminUser(this.uid);
				console.log(res.user);
				firebase.auth().currentUser.getIdToken()
					.then(
						(token: string) => this.token = token
					)
			})
			.catch(
				error => console.log(error)
			);
	}

	logout() {
		firebase.auth().signOut();
		this.token = null;
		this.router.navigate(['/']);
	}

	getToken() {
		firebase.auth().currentUser.getIdToken()
			.then(
				(token: string) => {
					this.token = token
				});
		return this.token;
	}

	isAuthenticated() {
		return this.token != null;
	}

	// isAdminUser(userId: string) {
	// 	this.userService.getById(userId).subscribe(
	// 		(data) => {
	// 			this.isAdmin = data.json().role === 'admin' ? true : false;
	// 		}
	// 	)

	// }
}