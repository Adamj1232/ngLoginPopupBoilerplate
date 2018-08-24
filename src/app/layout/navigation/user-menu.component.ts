import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';



@Component({
    selector: 'app-user-menu',
    template: `<button class="user-menu" mat-icon-button
                    matTooltip="Click for Menu Options"
                    [matMenuTriggerFor]="usermenu">
                    <mat-icon class="user-menu-icon">account_circle</mat-icon>
                </button>
                <mat-menu #usermenu="matMenu">

                    <button mat-menu-item
                        class="logout-btn user-menu-item"
                        (click)="logout()">
                        <mat-icon>eject</mat-icon>
                        Logout
                    </button>
                </mat-menu>`,
    styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
    constructor(
        private authentication: AuthenticationService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit() {}

    public logout(): void {
        this.authentication.logout().subscribe(success => {
            this.router.navigate(['/login']);
        });
    }
}
