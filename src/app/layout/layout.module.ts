import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

import { LayoutComponent } from './layout.component';
import { UserMenuComponent } from './navigation/user-menu.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        PipesModule,
        RouterModule,
    ],
    exports: [
        LayoutComponent
    ],
    declarations: [
        LayoutComponent,
        UserMenuComponent
    ],
    providers: []
})
export class LayoutModule { }
