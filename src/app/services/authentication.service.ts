import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { TokenService } from './token.service';



@Injectable()
export class AuthenticationService extends DataService {
    protected loginPath = '/auth/v1/tokens';

    constructor(
        private me: TokenService
    ) {
        super();
    }

    public login(username: string, password: string): Observable<boolean> {
        // token specific header, will need to be altered for usage
        const hdr = {'Authorization' : 'Basic ' + btoa(username + ':' + password)}
        return super.post(this.loginPath, {}, hdr)
                    .map( res => this.cacheThisDude(res))
                    .catch( err => Observable.of(false) );
    }
    private cacheThisDude(user: object): boolean {
        this.me.cacheToken(JSON.stringify(user), 'auth');
        return true;
    }
    public logout(): Observable<boolean>  {
        this.me.deleteCache()
        return Observable.of(true);
        // return this.delete(this.loginPath + '0')
        //             .map( res => {
        //                 return true;
        //             })
        //             .catch( err => Observable.of(false) );
    }

    public isLoggedIn(): Observable<boolean> {
       return this.me
                .isTokenThere()
                .map( res => true )
                .catch( err => Observable.of(false) );
    }

}
