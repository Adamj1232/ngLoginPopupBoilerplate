import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Token } from 'app/services/token';

@Injectable()
export class WhoAmIService {

    constructor(
    ) { }

    public cacheToken(user: string): void {
        sessionStorage.setItem('auth', user);
    }
    public getMeToken(): Observable<Token> {
        return Observable.of(this.getToken());
    };
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
        return (this.getToken() !== null)
    }
    private getToken(): Token {
        const tmp = JSON.parse(sessionStorage.getItem('auth'));
        if (tmp === null) {
            return tmp;
        }
        const tmpToken: Token = Object.assign(new Token, tmp); // this works fine for simple non-nested objects
        return tmpToken;
    };
    public deleteCache(): void {
        sessionStorage.removeItem('auth')
    }
    /*
    public amIAuthorized( reqAuth: Authorization ): Observable<boolean> {
        return this.getMe().mergeMap(
            () => this.user.isAuthorized( this.me, reqAuth )
        );
    }
    */
    // MDS 7/12 not sure if this is used anyplace
    // public filter(list: IAuthorization[]): Observable<IAuthorization[]> {
    //     return this.getMe().mergeMap(
    //         () => this.user.filter(this.me, list)
    //     );
    // }
}
