import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from '../interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token: string;
    private authStatusListener = new BehaviorSubject<boolean>(false);
    private isAuthenticated = false;
    private logoutTimer: any;
    private userId: string;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    getToken(): string {
        return this.token;
    }

    getAuthStatus() {
        return this.authStatusListener.asObservable();
    }

    isAuth() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    createUser(email: string, password: string) {
        const authData: AuthData = { email, password };
        this.http.post('http://localhost:3000/api/user/signup', authData)
        .subscribe((response) => {
            console.log(response);
            this.router.navigate(['/login']);
        });
    }

    loginUser(email: string, password: string) {
        const authData: AuthData = { email, password };
        this.http.post<{token: string, expiresIn: number, userId: string}>('http://localhost:3000/api/user/login', authData)
        .subscribe((response) => {
            console.log(response);
            this.token = response.token;
            this.userId = response.userId;
            const expiresInDuration = response.expiresIn;
            this.logoutTimer = setTimeout(this.logoutUser, expiresInDuration * 1000);
            const now = new Date();
            const expirationDate = now.getTime() + expiresInDuration * 1000;
            this.saveAuthData(this.token, new Date(expirationDate), this.userId);
            this.authStatusListener.next(true);
            this.isAuthenticated = true;
            this.router.navigate(['/']);
        });
    }

    autoLoginUser() {
        const authInfo = this.getAuthData();
        if (!authInfo) {
            return;
        }
        const now = new Date();
        const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
        console.log('expires in: ', expiresIn);
        if (expiresIn > 0) {
            this.token = authInfo.token;
            this.userId = authInfo.userId;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.logoutTimer = setTimeout(this.logoutUser, expiresIn);
        }
    }

    logoutUser() {
        this.token = null;
        this.authStatusListener.next(false);
        this.isAuthenticated = false;
        this.userId = null;
        this.router.navigate(['/login']);
        clearTimeout(this.logoutTimer);
        this.clearAuthData();
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token,
            expirationDate: new Date(expirationDate),
            userId,
        };
    }

}
