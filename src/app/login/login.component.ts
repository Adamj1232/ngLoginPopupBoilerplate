import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';
import { AuthenticationService } from 'app/services/authentication.service';
import { TokenService } from 'app/services/token.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public username: string;
    public password: string;
    public versionName: string;
    public logoPath: string;
    public loginFailed = false;
    public loginInfoEmitter: any = new EventEmitter();

    private afterLoginRoute: string[] = ['/'];

    constructor (
        private authentication: AuthenticationService,
        private dialog: MatDialog,
        private location: Location,
        private me: TokenService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route
            .data
            .subscribe(routerData => {
                !routerData['appName'] ?
                    this.versionName = 'Define Application Name in App.Routing'
                :
                    this.versionName = routerData.appName;

                !routerData['logo'] ?
                    this.logoPath = ''
                :
                    this.logoPath = routerData.logo;
            });
        this.authentication
            .isLoggedIn()
            .subscribe(loggedIn => {
                if ( loggedIn ) {
                    this.router.navigate([this.location.path()]);
                }
        });
    }

    inputChanged(passwordLength): void {
        if (passwordLength.length) {
            this.loginFailed = false;
        }
    }

    login(): void {
        this.authentication.login(this.username, this.password)
            .flatMap (v => this.me.getUser())
            .subscribe(res => {
                if (res) {
                    this.router.navigate([this.location.path()]);
                    this.loginInfoEmitter.emit(true);
                } else {
                    this.password = null;
                    this.loginFailed = true;
                }
            }, err => {
                this.loginInfoEmitter.emit(false);
                this.password = null;
                this.loginFailed = true;
            })
    }
}
