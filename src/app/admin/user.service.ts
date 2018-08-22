import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

const baseUrl = 'https://diy-ideas-e2852.firebaseio.com/users';

@Injectable()
export class UserService {
  usersChanged = new Subject<User[]>()

  private users: User[]=[]

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getAllUsers() {
    return this.http.get(`${baseUrl}/.json`)
      .pipe(map((res : Response) => {
        const ids = Object.keys(res);
        const users : User[] = [];
        for (const i of ids) {
          users.push(new User(i, res[i].email, 
            res[i].username, res[i].imageUrl));
        }
        this.users=users;
        return users;
      }));
  }

  createUser(body : User) {
    const token = this.authService.getToken();
    return this.http.put(`${baseUrl}/${body.id}/.json?auth=`+token, body);
  }

  getById(userId : string) {
    const token = this.authService.getToken();
    return this.http.get(`${baseUrl}/${userId}/.json?auth=`+token);
  }

  editUser(body : User) {
    const token = this.authService.getToken();
    return this.http.patch(`${baseUrl}/${body.id}/.json?auth=`+token, body);
  }

  deleteUser(userId : string) {
    const token = this.authService.getToken();
    return this.http.delete(`${baseUrl}/${userId}/.json?auth=`+token);
  }

}
