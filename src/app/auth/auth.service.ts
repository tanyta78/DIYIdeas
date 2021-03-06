import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../admin/user.model';
import { ToastrService } from "ngx-toastr";

const baseUrl = 'https://diy-ideas-e2852.firebaseio.com/users';

@Injectable()
export class AuthService {
	token: string;
	isAdmin: boolean = false;

	uid: string;
	usersChanged = new Subject<User[]>()
	userUid: string;
	userStatus: string

	private users: User[] = []

	constructor(
		private router: Router,
		private http: HttpClient,
		private toastr: ToastrService
	) { }

	getAllUsers() {
		return this.http.get<User[]>(`${baseUrl}/.json`)
			.pipe(map((userDb) => {
				const ids = Object.keys(userDb);

				const users: User[] = [];
				for (const i of ids) {
					let current = new User(i, userDb[i].email,
						userDb[i].username, userDb[i].imageUrl);
					current.status = userDb[i].status;
					current.role = userDb[i].role;
					users.push(current);
				}
				this.users = users;
				return users
			})).subscribe(
				(allUsers: User[]) => {
					this.users = allUsers;
					this.usersChanged.next(this.users.slice())
				}
			);
	}

	getUsers() {
		return this.users.slice();
	}

	getUser(userId: string) {
		let index = this.users.findIndex(item => userId === item.id);
		console.log(index);
		return this.users[index];
	}

	getById(userId: string) {
		return this.http.get<User>(`${baseUrl}/${userId}/.json`);
	}

	addUserIn(user: User) {
		this.users.push(user);
		this.usersChanged.next(this.users.slice())
	}

	addUserAndSetUserUid(user: User, password: string) {
		//to change userId with correct one is possible after user is signup in firebase
		this.signupUserIn(user.email, password).then(
			data => {

				this.userUid = data.user.uid;
				this.addUser(user, password).subscribe((r) => {
					this.addUserIn(user);
					this.toastr.success(`User succesfully created`, 'Success!');

				})
			}
		)
			.catch(
				error => {
					this.toastr.warning(error.message, 'Warning!');
					console.log(error)}
			);;
	}

	addUser(user: User, password: string) {
		user.id = this.userUid;
		return this.http.put(`${baseUrl}/${user.id}/.json`, user);
	}

	updateUser(newUser: User) {
		let index = this.users.findIndex(item => newUser.id === item.id);

		this.users[index] = newUser;
		this.usersChanged.next(this.users.slice());
	}

	editUser(user: User) {
		let index = this.users.findIndex(item => user.id === item.id);
		this.users[index] = user;
		this.usersChanged.next(this.users.slice());
		return this.http.patch(`${baseUrl}/${user.id}/.json`, user);
	}

	deleteUser(user: User) {
		let index = this.users.findIndex(item => user.id === item.id);
		this.users.splice(index, 1);
		this.usersChanged.next(this.users.slice());
		return this.http.delete(`${baseUrl}/${user.id}/.json`);
	}

	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(data => {
				console.log(data);
				
				this.userUid = data.user.uid;
				this.uid=this.userUid;
				let user = new User(this.userUid, email,
					email, '');
					firebase.auth().signInWithEmailAndPassword(email,password)
					.then(res=>{
						firebase.auth().currentUser.getIdToken()
						.then(
							(token: string) => {
								this.token = token
								this.userStatus = user.status;
								this.isAdmin = user.role === 'admin' ? true : false;
								this.addUser(user, password).subscribe((r) => {
									console.log(user)
									this.addUserIn(user);
									this.toastr.success(`Successfull registraion`, 'Success!');
									this.router.navigate(['/'])
							})
							});
					
				
				})
			})
			.catch(
				error => {
					this.toastr.warning(error.message, 'Warning!');
					console.log(error)}
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

							this.getById(this.uid).subscribe(
								(data) => {
									this.userStatus = data.status;
									if(this.userStatus==='deleted'){
										this.toastr.warning(`Your profile is deleted`, 'Warning!');
									}else{
										this.toastr.success(`${res.user.email} logged in`, 'Success!');
									}
									
									this.isAdmin = data.role === 'admin' ? true : false;
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
		this.toastr.success(`Successful logged out`, 'Success!');
		this.token = null;
		this.isAdmin=false;
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
		
		if (this.token != null) {
			if (this.userStatus === 'deleted') {
				return false;
			} else {
				return true;
			}
		} else {
			return false
		};
	}

	isAdminUser(userId: string) {
		this.getById(userId).subscribe(
			(data) => {
				this.isAdmin = data.role === 'admin' ? true : false;
			}
		)
	}

}