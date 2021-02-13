import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    isLoading: Observable<boolean>;
    maxDate: Date;
    minDate: Date;

    constructor(
        private auth: AuthService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
        this.minDate = new Date();
        this.minDate.setFullYear(this.minDate.getFullYear() - 99);
        this.isLoading = this.store.select(fromRoot.getIsLoading);
    }

    onSubmit(form: NgForm) {
        console.log(form);
        this.auth.registerUser({
            email: form.value.email,
            password: form.value.password,
            birthDate: form.value.birthdate
        });
    }

}
