import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

import { FirstComponent } from './first.component';
import { TokenService } from '../services/token.service';

const firstRoutes: Routes = [{
    path: '',
    component: FirstComponent,
    pathMatch: 'full'
}];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        RouterModule.forChild(firstRoutes),
        ReactiveFormsModule,
    ],
    declarations: [
        FirstComponent,
    ],
    exports: [
    ],
    providers: [
        TokenService
    ],
    entryComponents: [
    ]
})
export class FirstModule { }
