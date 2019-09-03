import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './components/shared.module';
import { CoreModule } from './components/core.module';
import { LoggingService } from './services/logging.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        // our custom modules
        SharedModule,
        CoreModule
    ],
    providers: [LoggingService],
    bootstrap: [AppComponent]
})
export class AppModule { }
