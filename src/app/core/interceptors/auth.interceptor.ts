import {
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService,
		private router: Router,
		private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
            if(this.authService.isAuthenticated()) {
                request = request.clone({
                    params: request.params.set('auth',this.authService.getToken())
                });
           }
           return next.handle(request);
		            
    }
}