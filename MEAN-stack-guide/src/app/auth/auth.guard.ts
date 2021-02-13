import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

type CanActivateReturn = boolean | Observable<boolean> | Promise<boolean>;

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateReturn {
        if (this.auth.isAuth()) {
            return true;
        } else {
            return this.router.navigate(['/login']);
        }
    }
}
