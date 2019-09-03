import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { LoggingService } from 'src/app/services/logging.service';

const routes: Routes = [
    { path: '', component: ShoppingListComponent },
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        FormsModule
    ],
    providers: [LoggingService] // gets a separate instance as it's a lazy loaded module
})
export class ShoppingListModule { }
