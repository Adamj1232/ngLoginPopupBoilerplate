// import { environment } from './../../environments/environment.aws-tunnel';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { ServiceLocator } from '../service-locator';

@Injectable()
export class DataService {
    protected devMode: boolean;
    private httpClient: HttpClient;

    constructor() {
        this.devMode = !environment.production;
        this.httpClient = ServiceLocator.injector.get(HttpClient);
    }
    private getRoot(isDeviceAPICall: boolean): string {
        return isDeviceAPICall ? environment.apiRoot : environment.secondApiRoot;
    }
    protected extractData(res: any) {
        // Handle 204 - NO CONTENT
        if (res === null) {return {}};
        if (res.code === 204) {
            return {};
        }
        return res || {};
    }

    protected handleError(error: Response | any): Observable<any> {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            let body;
            try {
                body = error.json() || '';
            } catch (Error) {
                body = '';
            }
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(error);
    }

    protected get(path: string, headerObj = {}, isDeviceCall = false): Observable<any> {
        return this.httpClient
            .get(this.getRoot(isDeviceCall) + path, {
                headers: headerObj })
            .map(res => this.extractData(res))
            .catch(error => this.handleError(error));
    }

    protected put(path: string, headerObj = {}, obj: any, isDeviceCall = false): Observable<any> {
        return this.httpClient
            .put(this.getRoot(isDeviceCall) + path, obj, { headers: headerObj })
            .map(res => this.extractData(res))
            .catch(error => this.handleError(error));
    }

    protected post(path: string, obj: any, headerObj = {}, isDeviceCall = false): Observable<any> {
        return this.httpClient
            .post(this.getRoot(isDeviceCall) + path, obj, {
                headers: headerObj
            })
            .map(res => {
                return this.extractData(res)
            })
            .catch(error => this.handleError(error));
    }

    protected delete(path: string, headerObj = {}, isDeviceCall = false): Observable<any> {
        return this.httpClient
            .delete(this.getRoot(isDeviceCall) + path, { headers: headerObj })
            .map(res => this.extractData(res))
            .catch(error => this.handleError(error));
    }
}
