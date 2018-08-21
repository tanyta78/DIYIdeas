import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  onSaveData() {
    this.dataStorageService.storeProjects()
      .subscribe(
        (res: Response) => {
          console.log(res);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getProjects();
  }

  onLogout(){
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    // return true;
     return this.authService.isAdmin;
  }
}
