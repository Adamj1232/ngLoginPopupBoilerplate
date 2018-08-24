import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        FormsModule
    ],
    exports: [
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
    ]
})
export class LoginModule {}
