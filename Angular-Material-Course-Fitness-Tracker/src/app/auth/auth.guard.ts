import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private store: Store<fromRoot.State>
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.store.select(fromRoot.getIsAuth).pipe(take(1))) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }

    canLoad(route: Route) {
        if (this.store.select(fromRoot.getIsAuth).pipe(take(1))) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}
