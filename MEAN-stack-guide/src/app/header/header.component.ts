import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public isAuth = false;

    constructor(
        public auth: AuthService
    ) { }

    ngOnInit() {
        this.auth.getAuthStatus().subscribe((result) => {
            this.isAuth = result;
        });
    }

    onLogout() {
        this.auth.logoutUser();
    }
}
