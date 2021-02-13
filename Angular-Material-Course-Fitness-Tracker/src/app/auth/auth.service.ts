import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private router: Router,
        private auth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) { }

    initAuthListener() {
        this.auth.authState.subscribe((user) => {
            if (user) {
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training']);
            } else {
                this.store.dispatch(new Auth.SetUnauthenticated());
                this.trainingService.cancelSubscriptions();
                this.router.navigate(['/login']);
            }
        });
    }

    registerUser(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.auth.auth.createUserWithEmailAndPassword( authData.email, authData.password )
        .then((result) => {
            // ...
        })
        .catch((error) => {
            console.log(error);
            this.uiService.showSnackbar(error.message, 'OK', 5000);
        })
        .finally(() => {
            this.store.dispatch(new UI.StopLoading());
        });
    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.auth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then((result) => {
            // ...
        })
        .catch((error) => {
            console.log(error);
            this.uiService.showSnackbar(error.message, 'OK', 5000);
        })
        .finally(() => {
            this.store.dispatch(new UI.StopLoading());
        });
    }

    logout() {
        this.auth.auth.signOut();
    }

}
