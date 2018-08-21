import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
	token: string;
	isAdmin: boolean = false;
	uid : string ;

	constructor(private router: Router) { }

	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(data => {
				console.log(data);
				
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

	// isAdmin(){
	// 	if (!this.isAuthenticated()) {
	// 		return false;
	// 	}
	// 	firebase.auth().currentUser.getIdTokenResult()
	// 		.then((idTokenResult) => {
	// 			// Confirm the user is an Admin.
	// 			if (!!idTokenResult.claims.admin) {
	// 				return true;
	// 			} else {
	// 				return false;
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});

	// }
}