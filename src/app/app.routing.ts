import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';


export const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
        {
            path: 'first',
            // canActivate: [AuthActivationGuard],
            loadChildren: 'app/first/first.module#FirstModule',
        }, {
            path: '**',
            // canActivate: [AuthActivationGuard],
            redirectTo: 'first'
        }
    ]
    }
];
