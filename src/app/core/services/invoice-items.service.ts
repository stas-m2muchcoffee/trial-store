import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

import { InvoiceItem } from '../interfaces/invoice-item';
import { StateManagement, StateRequests } from '../../shared/state-management';

import { HandleError, HttpErrorHandlerService } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8'
  })
};

@Injectable()
export class InvoiceItemsService {
  invoiceItems$: ConnectableObservable<InvoiceItem[]>;
  addedInvoiceItem$: ConnectableObservable<InvoiceItem>;
  updatedInvoiceItem$: ConnectableObservable<InvoiceItem>;
  removeInvoiceItem$: ConnectableObservable<InvoiceItem>;
  private handleError: HandleError;
  stateManagement: StateManagement<InvoiceItem> = new StateManagement<InvoiceItem>();

  constructor(
    private http: HttpClient,
    httpErrorHandlerService: HttpErrorHandlerService
  ) {
    this.handleError = httpErrorHandlerService.createHandleError('InvoiceItemsService');

    this.invoiceItems$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$
    )
      .map(([entities, ids]: [{ [index: number]: InvoiceItem }, number[]]) => {
        return ids.map(id => entities[id]);
      })
      .publishReplay(1);
    this.invoiceItems$.connect();

    this.addedInvoiceItem$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.addEntityId$
    )
      .map(([entities, id]: [{ [index: number]: InvoiceItem }, number]) => entities[id])
      .publishReplay(1);
    this.addedInvoiceItem$.connect();

    this.addedInvoiceItem$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.addEntityId$
    )
      .map(([entities, id]: [{ [index: number]: InvoiceItem }, number]) => entities[id])
      .publishReplay(1);
    this.addedInvoiceItem$.connect();

    this.removeInvoiceItem$ = this.stateManagement.responseData$
      .filter(responseData => responseData.type === StateRequests.Remove)
      .map((responseData) => (responseData.value[0] as InvoiceItem))
      .publishReplay(1);
    this.removeInvoiceItem$.connect();
  }
  getInvoiceItems(id: number | string): Observable<InvoiceItem[]> {
    this.stateManagement.getList$.next(this.http.get<InvoiceItem[]>(`invoices/${id}/items`));
    return this.invoiceItems$;
  }
  createInvoiceItem(invoiceItem, invoiceId): Observable<InvoiceItem> {
    this.stateManagement.add$.next(this.http.post<InvoiceItem>(`invoices/${invoiceId}/items`, invoiceItem, httpOptions));
    return this.addedInvoiceItem$;
  }
  updateInvoiceItem(invoiceItem, InvoiceItemId, invoiceId): Observable<InvoiceItem> {
    this.stateManagement.update$.next(this.http.put<InvoiceItem>(`invoices/${invoiceId}/items/${InvoiceItemId}`, invoiceItem, httpOptions));
    return this.updatedInvoiceItem$;
  }
  deleteInvoiceItem(InvoiceItemId, invoiceId): Observable<InvoiceItem> {
    this.stateManagement.remove$.next(this.http.delete<InvoiceItem>(`invoices/${invoiceId}/items/${InvoiceItemId}`, httpOptions));
    return this.removeInvoiceItem$;

    // return this.http.delete(`invoices/${invoiceId}/items/${InvoiceItemId}`, httpOptions)
    //   .pipe(
    //     catchError(this.handleError('deleteInvoiceItem', {}, false))
    //   );
  }
}
