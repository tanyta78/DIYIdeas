import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthGuard implements CanActivate{

	constructor(
		private authService: AuthService,
		private router: Router,
		private toastr: ToastrService){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		if(this.authService.isAuthenticated()){
			return true;
		} else{
			this.toastr.warning(`You should login first!`, 'Warning!');
			this.router.navigate(['/signin'])
		}
	}
}