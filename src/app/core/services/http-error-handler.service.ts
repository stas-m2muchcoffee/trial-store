import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ModalService } from './modal.service';

export type HandleError =
  <T>(operation?: string, result?: T, twoBtn?: boolean) =>
    (error: HttpErrorResponse) => Observable<T>;

@Injectable()
export class HttpErrorHandlerService {

  constructor(
    private modalService: ModalService
  ) {}

  createHandleError = (serviceName = '') =>
    <T>(operation = 'operation', result = {} as T, twoBtn = true) =>
      this.handleError(serviceName, operation, result, twoBtn)

  handleError<T>(serviceName = '', operation = 'operation', result = {} as T, twoBtn = true) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.statusText}"`;
      this.modalService.confirmModal(`${serviceName}: ${operation} failed: ${message}`, twoBtn);
      return of( result );
    };
  }
}
