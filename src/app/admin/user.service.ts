import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

const baseUrl = 'https://diy-ideas-e2852.firebaseio.com/users';
//TODO: DELETE THIS SERVICE
@Injectable()
export class UserService {
  // usersChanged = new Subject<User[]>()
  // userUid:string;

  // private users: User[] = []

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

//   getAllUsers() {
//     return this.http.get(`${baseUrl}/.json`)
//       .pipe(map((res: Response) => {
//         const userDb = res.json();
//         const ids = Object.keys(res.json());

//         const users: User[] = [];
//         for (const i of ids) {
//           users.push(new User(i, userDb[i].email,
//             userDb[i].username, userDb[i].imageUrl));
//         }
//         this.users = users;
//         return users as User[];
//       }));
//   }

 
//   getById(userId: string) {
//     const token = this.authService.getToken();
//     return this.http.get(`${baseUrl}/${userId}/.json?auth=` + token);
//   }

//   addUserAndSetUserUid(user : User, password: string) {
//     //to change userId with correct one is possible after user is signup in firebase
//     this.authService.signupUserIn(user.email,password).then(
//       data=>{
//         console.log(data.user.uid)
//         this.userUid = data.user.uid;
//         this.addUser(user,password).subscribe((r) => {
//           console.log(r)
         
//         })
//       }
//     )
//     .catch(
//       error => console.log(error)
//     );;}

//     addUser(user : User, password: string){
//     console.log(this.userUid);
//     user.id=this.userUid;
//     const token = this.authService.getToken();
//     return this.http.put(`${baseUrl}/${user.id}/.json?auth=`+token, user);
// }

//   editUser(body: User) {
//     const token = this.authService.getToken();

//     let index = this.users.indexOf(body);
//     console.log(index);

//     this.users[index] = body;
//     this.usersChanged.next(this.users.slice());
//     return this.http.patch(`${baseUrl}/${body.id}/.json?auth=` + token, body);
//   }

  
//   deleteUser(user: User) {
//     const token = this.authService.getToken();
//     let index = this.users.indexOf(user);
//     this.users.splice(index, 1);
//     this.usersChanged.next(this.users.slice());
//     return this.http.delete(`${baseUrl}/${user.id}/.json?auth=` + token);
//   }

}
