import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/withLatestFrom';

import { Store } from '@ngrx/store';

import { StateManagement } from '../../shared/utils/state-management';

import { AppState } from '../../ngrx';
import * as invoiceItems from '../../ngrx/invoice-items/actions';
import * as invoiceItemsGetterState from '../../ngrx/invoice-items/states/invoice-items-getter.state';
import * as invoiceItemsGetGetterState from
    '../../ngrx/requests/nested-states/invoice-items/nested-states/invoice-items-get/states/invoice-items-get-getter.state';
import * as invoiceItemPostGetterState from
    '../../ngrx/requests/nested-states/invoice-items/nested-states/invoice-item-post/states/invoice-item-post-getter.state';
import * as invoiceItemPutGetterState from
    '../../ngrx/requests/nested-states/invoice-items/nested-states/invoice-item-put/states/invoice-item-put-getter.state';

import { InvoiceItem } from '../interfaces/invoice-item';
import 'rxjs/add/operator/do';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};

@Injectable()
export class InvoiceItemsService {
  invoiceItems$: Observable<InvoiceItem[]>;
  addedInvoiceItem$: Observable<InvoiceItem>;
  updatedInvoiceItem$: Observable<InvoiceItem>;
  state: StateManagement<InvoiceItem>;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {
    this.state = new StateManagement<InvoiceItem>();

    this.invoiceItems$ = this.store.select(invoiceItemsGetterState.getInvoiceItems)
    .withLatestFrom(this.store.select(invoiceItemsGetGetterState.getIsLoadedInvoiceItemsGet))
    .filter(([items , isData]) => isData)
    .map(([items, isData]) => items);

    this.addedInvoiceItem$ = this.store.select(invoiceItemPostGetterState.getInvoiceItemPostData)
    .withLatestFrom(this.store.select(invoiceItemPostGetterState.getIsLoadedInvoiceItemPost))
    .filter(([items , isData]) => isData)
    .map(([item, isData]) => item);

    this.updatedInvoiceItem$ = this.store.select(invoiceItemPutGetterState.getInvoiceItemPutData);
  }

  getInvoiceItems(id: number | string) {
    this.store.dispatch(new invoiceItems.GetInvoiceItemsAction(id));
    return this.invoiceItems$;
  }

  getInvoiceItemsRequest(id: number | string): Observable<InvoiceItem[]> {
    return this.http.get<InvoiceItem[]>(`invoices/${id}/items`);
  }

  createInvoiceItem(invoiceItem): Observable<InvoiceItem> {
    this.store.dispatch(new invoiceItems.CreateInvoiceItemAction(invoiceItem));
    return this.addedInvoiceItem$;
  }

  createInvoiceItemRequest(invoiceItem): Observable<InvoiceItem> {
    return this.http.post<InvoiceItem>(`invoices/${invoiceItem.invoice_id}/items`, invoiceItem, httpOptions);
  }

  updateInvoiceItem(invoiceItem): Observable<InvoiceItem> {
    this.store.dispatch(new invoiceItems.UpdateInvoiceItemAction(invoiceItem));
    return this.updatedInvoiceItem$;
  }

  updateInvoiceItemRequest(invoiceItem: InvoiceItem): Observable<InvoiceItem> {
    return this.http.put<InvoiceItem>(`invoices/${invoiceItem.invoice_id}/items/${invoiceItem.id}`, invoiceItem, httpOptions);
  }

  deleteInvoiceItem(invoiceItem: InvoiceItem): Observable<InvoiceItem> {
    this.state.remove$.next(this.http.delete<InvoiceItem>(`invoices/${invoiceItem.invoice_id}/items/${invoiceItem.id}`, httpOptions));
    return this.state.removeResponse$;
  }
}
