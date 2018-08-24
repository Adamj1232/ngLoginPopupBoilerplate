import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor( private st2: TokenService ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'POST' && !request.url.endsWith('tokens')) {
        request = request.clone({
            setHeaders: {
              'X-Auth-Token': this.st2.getMe().token
            }
        });
    }
    return next.handle(request);
  }


  /*    TODO: according to the docs, this is how it will look for Angular 6.0....
        intercept(req: HttpRequest, next: HttpHandler): Observable> {

        return next.handle(req).pipe(tap((event: HttpEvent) => {
            if (event instanceof HttpResponse) {
                event = event.clone({body: this.modifyBody(event.body)});
            }
            return event;
        }));

    }

  */
}
