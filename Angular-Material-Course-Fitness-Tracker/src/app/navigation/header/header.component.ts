import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Output() sidenavToggle = new EventEmitter<void>();
    isAuth: Observable<boolean>;

    constructor(
        private store: Store<fromRoot.State>,
        private auth: AuthService
    ) { }

    ngOnInit() {
        this.isAuth = this.store.select(fromRoot.getIsAuth);
    }

    onToggleSidenav() {
        this.sidenavToggle.emit();
    }

    onLogout() {
        this.auth.logout();
    }

}
