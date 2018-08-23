import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .pipe(
                tap(this.handleSuccess)
            );
    }

    private handleSuccess = (event: HttpEvent<any>): void => {
        if (event instanceof HttpResponse) {
            if (event.body.message) {
                this.toastr.success(event.body.message, 'Success:');
            }
        };
    }
}