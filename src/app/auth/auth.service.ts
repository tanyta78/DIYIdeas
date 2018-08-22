import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { User } from '../admin/user.model';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

const baseUrl = 'https://diy-ideas-e2852.firebaseio.com/users';

@Injectable()
export class AuthService {
	token: string;
	isAdmin: boolean = false;
	//isAdmin: boolean = true;

	uid: string;
	usersChanged = new Subject<User[]>()
	userUid: string;

	private users: User[] = []

	constructor(
		private router: Router,
		private http: Http
	) { }

	getAllUsers() {
		return this.http.get(`${baseUrl}/.json`)
			.pipe(map((res: Response) => {
				const userDb = res.json();
				const ids = Object.keys(res.json());

				const users: User[] = [];
				for (const i of ids) {
					users.push(new User(i, userDb[i].email,
						userDb[i].username, userDb[i].imageUrl));
				}
				this.users = users;
				return users as User[];
			}));
	}
	
	getById(userId: string) {
		const token = this.getToken();
		return this.http.get(`${baseUrl}/${userId}/.json?auth=` + token);
	}

	addUserAndSetUserUid(user: User, password: string) {
		//to change userId with correct one is possible after user is signup in firebase
		this.signupUserIn(user.email, password).then(
			data => {
				console.log(data.user.uid)
				this.userUid = data.user.uid;
				this.addUser(user, password).subscribe((r) => {
					console.log(r)

				})
			}
		)
			.catch(
				error => console.log(error)
			);;
	}

	addUser(user: User, password: string) {
		console.log(this.userUid);
		user.id = this.userUid;
		const token = this.getToken();
		return this.http.put(`${baseUrl}/${user.id}/.json?auth=` + token, user);
	}

	editUser(body: User) {
		const token = this.getToken();

		let index = this.users.indexOf(body);
		console.log(index);

		this.users[index] = body;
		this.usersChanged.next(this.users.slice());
		return this.http.patch(`${baseUrl}/${body.id}/.json?auth=` + token, body);
	}

	deleteUser(user: User) {
		const token = this.getToken();
		let index = this.users.indexOf(user);
		this.users.splice(index, 1);
		this.usersChanged.next(this.users.slice());
		return this.http.delete(`${baseUrl}/${user.id}/.json?auth=` + token);
	}

	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(data => {
				console.log(data);
				//TODO: save new created user in users db collection

				this.router.navigate(['/signin']);
			})
			.catch(
				error => console.log(error)
			);
	}

	signupUserIn(email: string, password: string) {
		return firebase.auth().createUserWithEmailAndPassword(email, password);

	}

	signinUser(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(res => {
				this.uid = res.user.uid;
				firebase.auth().currentUser.getIdToken()
					.then(
						(token: string) => {
							this.token = token
							console.log('in gettoken = ' + token)
							console.log('after gettoken = ' + this.token)
							this.getById(this.uid).subscribe(
								(data) => {
									console.log(data.json())
									this.isAdmin = data.json().role === 'admin' ? true : false;
									console.log('after is admin user = ' + this.isAdmin)
									this.router.navigate(['/'])
								}
							)
						});
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
					console.log('in gettoken = ' + token)

				});
		return this.token;
	}

	isAuthenticated() {
		return this.token != null;
	}

	isAdminUser(userId: string) {
		this.getById(userId).subscribe(
			(data) => {
				console.log(data.json())
				this.isAdmin = data.json().role === 'admin' ? true : false;
			}
		)
	}

}