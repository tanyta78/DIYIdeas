import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
		private authService: AuthService,
    private router: Router,
    private toastr: ToastrService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.authService.isAuthenticated()&& this.authService.isAdmin){
        return true;
      } else{
        this.toastr.warning(`You do not have admin rigths`, 'Warning!');
        this.router.navigate(['/'])
      }
  }
}
