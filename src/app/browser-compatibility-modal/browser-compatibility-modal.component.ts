import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatCheckbox } from '@angular/material';

import * as moment from 'moment';

@Component({
    selector: 'dialog-table-modal',
    template: `
    <div class="modal-container">
        <mat-dialog-actions>
            <button class="close-btn" mat-button [mat-dialog-close]>
                    <i class="material-icons">close</i>
            </button>
        </mat-dialog-actions>
        <h1 mat-dialog-title class="browser-compatibility-title">Warning</h1>
        <div class="browser-compatibility-body">
            <mat-dialog-content class="user-version">
                You are using <b>{{this.data.browser | uppercase}}</b>: version <b>{{this.data.version}}</b>
            </mat-dialog-content>
            <mat-dialog-content>{{this.modalResponse}}</mat-dialog-content>
            <a href={{this.data.download}} >{{this.data.download}}</a>
            <mat-checkbox #compatability [checked]="isChecked" (change)="onChkChange()">Don't Notify Me Again</mat-checkbox>
        </div>
    </div>
    `,
    styleUrls: ['./browser-compatibility-modal.scss'],
})
export class DialogBrowserCompatibilityModal implements OnInit {
    public modalResponse: string;
    public isChecked = false;
    private showWarning = true;


    constructor(
        public dialogRef: MatDialogRef<DialogBrowserCompatibilityModal>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.checkUserResponse();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onChkChange() {
        this.isChecked = (this.isChecked === true ) ? false : true;
        const storedCompWarning = localStorage.getItem('CompatabilityWarning')
        if (!storedCompWarning) {
            const localStorageComp = {'ignore': 'IGNORE', 'date': moment().format('MM-DD-YYYY HH:mm:ss')}
            localStorage.setItem('CompatabilityWarning', JSON.stringify(localStorageComp));
        }
        if (storedCompWarning === 'IGNORE') {
            this.showWarning = false;
        }
    }

    private checkUserResponse() {
        if (this.data.otherBrowser === 'otherBrowser') {
            this.modalResponse =
                'This browser is not fully compatible with Symphony, please consider switching to the latest version of Chrome, Safari or Firefox. Download the latest Chrome browser at:  ';
        } else if (this.data.otherBrowser === 'osError') {
            this.modalResponse =
                'Your OS is not fully up to date and therefore may affect how this page displays. Consider updating your OS or change browsers for best experience. Download the latest version at: ';
        } else if (!this.data.otherBrowser) {
            this.modalResponse =
                'This browser may not be fully compatible with Symphony, please  switch to the latest version of Chrome or update your browser for best experience. Download the latest version: ';
        }
    }
}
