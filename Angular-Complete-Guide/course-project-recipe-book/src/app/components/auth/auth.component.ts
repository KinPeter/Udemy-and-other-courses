import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authObservable: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.isLoginMode) {
            authObservable = this.auth.login(email, password);
        } else {
            authObservable = this.auth.signUp(email, password);
        }
        authObservable.subscribe(
            (response) => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            (errorMessage) => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            }
        );
        form.reset();
    }

}
