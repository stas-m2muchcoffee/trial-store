import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { SpinnerService } from '../services/spinner.service';
import 'rxjs/add/operator/finally';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(private spinnerService: SpinnerService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.start();
        return next.handle(req)
            .finally(() => this.spinnerService.stop());
    }
}
