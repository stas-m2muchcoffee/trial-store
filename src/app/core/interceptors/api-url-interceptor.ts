import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrlReq = req.clone({
      url: req.url.replace('', 'http://api.invoice-app.2muchcoffee.com/api/')
    });
    return next.handle(apiUrlReq);
  }

}
