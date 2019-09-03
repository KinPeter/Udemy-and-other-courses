import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    genders = ['male', 'female'];
    signupForm: FormGroup;
    forbiddenUsernames = ['Peter', 'Cheyun'];

    ngOnInit() {
        this.signupForm = new FormGroup({
            'userData': new FormGroup({
                'username': new FormControl(
                    '',
                    [Validators.required, this.forbiddenNames.bind(this)]
                ),
                'email': new FormControl(
                    '',                                         // initial value
                    [Validators.required, Validators.email],    // sync validators
                    this.forbiddenEmails.bind(this)             // async validators
                )
            }),
            'gender': new FormControl('male'),
            'hobbies': new FormArray([])
        });

        // listening to any value changes:
        // this.signupForm.valueChanges.subscribe((value) => {
        //     console.log(value);
        // });

        // listening to form (or formControl) validity status changes:
        this.signupForm.statusChanges.subscribe((status) => {
            console.log(status);
        });

        // this.signupForm.setValue({
        //     'userData': {
        //         'username': 'Petike',
        //         'email': 'peti@p.com'
        //     },
        //     'gender': 'male',
        //     'hobbies': []
        // });

        // this.signupForm.patchValue({
        //     'userData': {
        //         'username': 'Petike'
        //     }
        // });
    }

    onSubmit() {
        console.log(this.signupForm);
        this.signupForm.reset();
    }

    getControls() {
        return (<FormArray>this.signupForm.get('hobbies')).controls;
    }

    onAddHobby() {
        const control = new FormControl('', Validators.required);
        (<FormArray>this.signupForm.get('hobbies')).push(control);
    }

    forbiddenNames(control: FormControl): {[s: string]: boolean} {
        if (this.forbiddenUsernames.includes(control.value)) {
            return {nameIsForbidden: true}; // if INVALID return object with true
        } else {
            return null; // if VALID need to return NULL
        }
    }

    forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'test@test.com') {
                    resolve({ 'emailIsForbidden': true }); // if INVALID resolve object with true
                } else {
                    resolve(null); // if VALID need to resolve NULL
                }
            }, 1500);
        });
    }
}
