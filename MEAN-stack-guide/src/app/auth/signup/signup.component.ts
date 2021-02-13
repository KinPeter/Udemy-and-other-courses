import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    public isLoading = false;

    constructor(
        private as: AuthService
    ) { }

    ngOnInit() {
    }

    onSignup(form: NgForm) {
        this.as.createUser(form.value.email, form.value.password);
    }

}
