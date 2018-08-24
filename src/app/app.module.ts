import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material';

// This is what the Angular Material quick start specifies, but seems wrong
// Shouldn't this go into the .angular-cli.json scripts?
import 'hammerjs';

import { ServiceLocator } from './service-locator';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';

import { Ng2DeviceDetectorModule } from 'ng2-device-detector';

import { DialogBrowserCompatibilityModal } from './browser-compatibility-modal/browser-compatibility-modal.component';
import { LoginModule } from './login/login.module';
import { AuthenticationService } from './services/authentication.service';
import { DataService } from './services/data.service';
import { TokenService } from './services/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { ResponseInterceptor } from './services/response.interceptor';

@NgModule({
    entryComponents: [
        DialogBrowserCompatibilityModal,
        LoginComponent
    ],
    declarations: [
        AppComponent,
        DialogBrowserCompatibilityModal,
    ],
    imports: [
        LayoutModule,
        LoginModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        MaterialModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        Ng2DeviceDetectorModule.forRoot()
    ],
    providers: [
        AuthenticationService,
        DataService,
        TokenService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private injector: Injector) {
        ServiceLocator.injector = this.injector;
    }
}
