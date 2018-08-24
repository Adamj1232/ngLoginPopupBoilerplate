import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Token } from './token';
import { DataService } from './data.service';

@Injectable()
export class TokenService extends DataService {
    protected userPath = '/api/v1/user';

    constructor() {
        super();
    }

    public cacheToken(user: string, key: string): void {
        sessionStorage.setItem(key, user);
    }

    public getMeToken(): Observable<Token> {
        return Observable.of(this.getToken());
    }

    public getMe(): Token {
        return this.getToken();
    }

    public isTokenThere(): Observable<boolean> {
        if (this.getToken() === null) {
            return Observable.throw('error');
        }
        return Observable.of(true);
    }

    public isTokenThere2(): boolean {
        return this.getToken() !== null;
    }

    private getToken(): Token {
        const tmp = JSON.parse(sessionStorage.getItem('auth'));
        if (tmp === null) {
            return tmp;
        }
        const tmpToken: Token = Object.assign(new Token(), tmp); // this works fine for simple non-nested objects
        return tmpToken;
    }

    public deleteCache(): void {
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('user');
    }

    public getUser(): Observable<boolean> {
        return super.get(this.userPath).map(user => this.cacheThisUser(user));
        // .catch( err => Observable.of(false) );
    }

    private cacheThisUser(user: object): boolean {
        this.cacheToken(JSON.stringify(user), 'user');
        return true;
    }

    public isAdminMeth(): boolean {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            return;
        }
        return user.rbac.is_admin;
    }
}
