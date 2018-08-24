
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { TokenService } from './token.service';
import { Router } from '../../../node_modules/@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor( private st2: TokenService, private router: Router ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.st2.deleteCache();
            this.router.navigate(['/']);
          }
        }
      });
    }
  }
