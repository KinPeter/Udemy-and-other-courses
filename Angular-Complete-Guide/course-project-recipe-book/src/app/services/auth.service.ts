import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`;
    private loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`;

    public user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    signUp(email: string, password: string) {
        const data = {
            email,
            password,
            returnSecureToken: true
        };
        return this.http.post<AuthResponseData>(this.signUpUrl, data)
            .pipe(
                catchError(this.handleError),
                tap((resData) => this.handleAuthentication(resData))
            );
    }

    login(email: string, password: string) {
        const data = {
            email,
            password,
            returnSecureToken: true
        };
        return this.http.post<AuthResponseData>(this.loginUrl, data)
            .pipe(
                catchError(this.handleError),
                tap((resData) => this.handleAuthentication(resData))
            );
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('recipeBookUser'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('recipeBookUser');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(resData: AuthResponseData) {
        const expirationDate = new Date( new Date().getTime() + +resData.expiresIn * 1000 );
        const newUser = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        this.user.next(newUser);
        this.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem('recipeBookUser', JSON.stringify(newUser));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An error occured.';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists.'; break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email is not registered.'; break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid password.'; break;
        }
        return throwError(errorMessage);
    }
}
