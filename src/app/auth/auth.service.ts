import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
	token: string;

	constructor(
		private toastr: ToastrService,
		private router: Router) { }

	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(data => {
				// TODO: add user model fields and create new user in users db
				this.toastr.success('Signed Up', 'Success');
				
				this.router.navigate(['/signin']);
			})
			.catch((err)=>
				this.toastr.error(err.message, 'Warning')

			);
	}

	signinUser(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(res => {
				this.router.navigate(['/']);
				firebase.auth().currentUser.getIdToken()
					.then((token: string) => {
						this.token = token;
						console.log(this.token)
					this.toastr.success('Logged In', 'Success');
					})
					
			})
			.catch(
				(err) => {
					this.toastr.error(err.message, 'Warning');
				  });
	}

	logout() {
		firebase.auth().signOut();
		this.token = null;		
	}

	getToken() {
		firebase.auth().currentUser.getIdToken()
			.then(
				(token: string) => {
					this.token = token
				});
		return this.token;
	}

	isAuthenticated():boolean {
		return this.token != null;
	}

	isAdmin() {
		if (!this.isAuthenticated()) {
			return false;
		}
		firebase.auth().currentUser.getIdTokenResult()
			.then((idTokenResult) => {
				// Confirm the user is an Admin.
				if (!!idTokenResult.claims.admin) {
					return true;
				} else {
					return false;
				}
			})
			.catch((error) => {
				console.log(error);
			});

	}
}