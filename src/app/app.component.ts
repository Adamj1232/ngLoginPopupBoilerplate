import { Router, Event, NavigationEnd, NavigationCancel } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { appVersion } from './app.version';
import * as moment from 'moment';
import { LoginComponent } from '../app/login/login.component';

import { Ng2DeviceService } from 'ng2-device-detector';
import { DialogBrowserCompatibilityModal } from './browser-compatibility-modal/browser-compatibility-modal.component';
import { TokenService } from 'app/services/token.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    public version: string;
    public browserInfo: any = null;
    public showWarning = true;


    constructor(
        private dialog: MatDialog,
        private sanitizer: DomSanitizer,
        private user: TokenService,
        private router: Router,
        private deviceBrowserService: Ng2DeviceService
    ) {
        this.checkForLogin();
    }

    ngOnInit() {
        this.version = appVersion;
        this.showCompatabilityWarning();
    }

    private checkForLogin() {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
                if (this.user.isTokenThere2()) {
                    this.user.getUser();
                } else if (!this.dialog.openDialogs.length) {
                    // show login
                    const dialogRef = this.dialog.open(LoginComponent, {
                        panelClass: 'login-modal-container',
                        backdropClass: 'login-modal-backdrop',
                        width: '700px',
                        height: '600px',
                        disableClose: true,
                        data: {},
                    });
                    let userData;
                    const dialogSub = dialogRef.componentInstance.loginInfoEmitter.subscribe(data => {
                        userData = data;
                        if (data) {
                            dialogRef.close();
                        }
                    })
                    if (userData) {
                        dialogRef.afterClosed().subscribe(() => {
                            dialogSub.unsubscribe();
                        })
                    }
                }
            }
        });
    }


    private detectBrowser() {
        this.browserInfo = this.deviceBrowserService.getDeviceInfo();
        if (this.browserInfo.os === 'mac' && this.browserInfo.os_version !== 'mac-os-x-13' &&
            (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!window['safari'])
        ) {
            this.openBrowserCompatibilityDialog('https://www.apple.com/macos/how-to-upgrade/', 'osError');
        }
        if (this.browserInfo.browser === 'chrome' &&
        parseInt(this.browserInfo.browser_version, 10) < 58
        ) {
                this.openBrowserCompatibilityDialog('https://www.google.com/chrome/browser/');
            }
        if (
            this.browserInfo.browser === 'safari' &&
            parseInt(this.browserInfo.browser_version, 10) < 11
        ) {
            this.openBrowserCompatibilityDialog(
                'https://support.apple.com/downloads/#safari'
            );
        }
        if (
            this.browserInfo.browser === 'firefox' &&
            parseInt(this.browserInfo.browser_version, 10) < 58
        ) {
            this.openBrowserCompatibilityDialog(
                'https://www.mozilla.org/en-US/firefox/new/'
            );
        }
        if (
            this.browserInfo.browser === 'opera' &&
            parseInt(this.browserInfo.browser_version, 10) < 50
        ) {
            this.openBrowserCompatibilityDialog('www.opera.com');
        }

        if (
            this.browserInfo.browser !== 'chrome' &&
            this.browserInfo.browser !== 'safari' &&
            this.browserInfo.browser !== 'opera' &&
            this.browserInfo.browser !== 'firefox'
        ) {
            this.openBrowserCompatibilityDialog(
                'https://www.google.com/chrome/browser/',
                'otherBrowser'
            );
        }
    }

    private openBrowserCompatibilityDialog(
        downloadAddress: string,
        otherBrowser?: string
    ) {
        this.dialog.open(DialogBrowserCompatibilityModal, {
            width: '500px',
            height: '290px',
            data: {
                browser: this.browserInfo.browser,
                version: this.browserInfo.browser_version,
                download: downloadAddress,
                otherBrowser: otherBrowser,
            },
        });
    }

    private showCompatabilityWarning() {
        const storedCompWarning = JSON.parse(localStorage.getItem('CompatabilityWarning'));
        if (!storedCompWarning) {
            this.detectBrowser();
            return;
        }
        const storedDate = moment(storedCompWarning.date, 'MM-DD-YYYY HH:mm:ss');
        const currentDate: any = moment();

        // removes stored 'do not show compatability' selection after 60 days
        if (currentDate.diff(storedDate, 'days') > 60) {
            localStorage.removeItem('CompatabilityWarning');
            this.detectBrowser();
            return;
        } else {
            this.showWarning = false;
        }
    }
}
