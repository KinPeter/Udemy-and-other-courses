import { Component, OnInit} from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isLoggedIn = false;

    constructor(
        private ds: DataStorageService,
        private auth: AuthService
    ) { }

    ngOnInit() {
        this.auth.user.subscribe((user) => {
            this.isLoggedIn = !!user;
        });
    }

    onSaveData() {
        this.ds.storeRecipes();
    }
    onFetchData() {
        this.ds.fetchRecipes().subscribe();
    }
    onLogout() {
        this.auth.logout();
    }

}
