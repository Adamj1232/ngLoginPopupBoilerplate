import {
    Component,
    OnInit,
    ViewChild,
    Output,
    EventEmitter,
    ElementRef,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
    Router,
    Event,
    NavigationEnd,
    NavigationCancel,
} from '@angular/router';
import { MatDialog } from '@angular/material';
import '../rxjs-operators';
import * as _ from 'lodash';
import * as moment from 'moment';

import { TokenService } from '../services/token.service';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-first',
    templateUrl: './first.component.html',
    styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {

    public isAdmin = false;

    constructor(
        private user: TokenService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.checkForLogin();
    }

    private checkForLogin() {
        // needs a check for user role to detemine if tables will be displayed
        this.checkForToken();
        this.dialog.afterAllClosed.subscribe(() => {
            this.checkForToken();
        });
    }

    private checkForToken(): void {
        this.isAdmin = this.user.isAdminMeth();
        if (this.isAdmin) {

        }
    }
}
