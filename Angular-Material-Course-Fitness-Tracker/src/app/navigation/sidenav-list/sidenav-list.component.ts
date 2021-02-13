import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

    @Output() closeSidenav = new EventEmitter<void>();
    isAuth: Observable<boolean>;

    constructor(
        private auth: AuthService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.isAuth = this.store.select(fromRoot.getIsAuth);
    }

    onLogout() {
        this.onClose();
        this.auth.logout();
    }

    onClose() {
        this.closeSidenav.emit();
    }

}
