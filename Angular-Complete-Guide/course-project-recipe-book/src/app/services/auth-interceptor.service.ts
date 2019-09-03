import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private auth: AuthService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.auth.user.pipe(
            take(1),
            exhaustMap((user) => {
                if (!user) {
                    return next.handle(request);
                }
                const modifiedRequest = request.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedRequest);
            })
        );
    }
}
