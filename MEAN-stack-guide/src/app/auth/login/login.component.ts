import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public isLoading = false;

    constructor(
        private as: AuthService
    ) { }

    ngOnInit() {
    }

    onLogin(form: NgForm) {
        this.as.loginUser(form.value.email, form.value.password);
    }

}
