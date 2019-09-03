import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from '../directives/dropdown.directive';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule { }
