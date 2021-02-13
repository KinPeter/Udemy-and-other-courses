import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        MaterialModule
    ]
})
export class SharedModule {}
