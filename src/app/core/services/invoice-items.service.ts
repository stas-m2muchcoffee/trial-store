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

import { AppState } from '../../ngrx/app-state/app-state';
import * as invoiceItemsActions from '../../ngrx/invoice-items/actions';
import * as invoiceItemsGetterState from '../../ngrx/invoice-items/states/invoice-items-getter.state';
import * as invoiceItemsGetListRequestsGetterState from '../../ngrx/requests/nested-states/invoice-items/nested-states/invoice-items-get-list/states/invoice-items-get-list-requests-getter.state';
import * as invoiceItemsCreateRequestsGetterState from '../../ngrx/requests/nested-states/invoice-items/nested-states/invoice-items-create/states/invoice-items-create-requests-getter.state';

import { InvoiceItem } from '../interfaces/invoice-item';

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
    .withLatestFrom(this.store.select(invoiceItemsGetListRequestsGetterState.getIsLoadedInvoiceItemsRequests))
    .filter(([items , isData]) => isData)
    .map(([items, isData]) => items);

    this.addedInvoiceItem$ = this.store.select(invoiceItemsGetterState.getAddedInvoiceItems)
    .withLatestFrom(this.store.select(invoiceItemsCreateRequestsGetterState.getIsLoadedInvoiceItemsRequests))
    .do(console.log)
    .filter(([items , isData]) => isData)
    .map(([item, isData]) => item);

    this.updatedInvoiceItem$ = Observable.combineLatest(
      this.state.entities$,
      this.state.updateEntityId$
    )
    .map(([entities, id]: [{ [index: number]: InvoiceItem }, number]) => entities[id]);
  }

  dispatchGetListInvoiceItems(id: number | string) {
    this.store.dispatch(new invoiceItemsActions.GetListInvoiceItemsAction(id));
    return this.invoiceItems$;
  }

  getInvoiceItems(id: number | string): Observable<InvoiceItem[]> {
    return this.http.get<InvoiceItem[]>(`invoices/${id}/items`);
  }

  dispatchCreateInvoiceItem(invoiceItem): Observable<InvoiceItem> {
    this.store.dispatch(new invoiceItemsActions.CreateInvoiceItemAction(invoiceItem));
    return this.addedInvoiceItem$;
  }

  createInvoiceItem(invoiceItem): Observable<InvoiceItem> {
    return this.http.post<InvoiceItem>(`invoices/${invoiceItem.invoice_id}/items`, invoiceItem, httpOptions);
  }

  updateInvoiceItem(invoiceItem: InvoiceItem): Observable<InvoiceItem> {
    this.state.update$
    .next(this.http.put<InvoiceItem>(`invoices/${invoiceItem.invoice_id}/items/${invoiceItem.id}`, invoiceItem, httpOptions));
    return this.updatedInvoiceItem$;
  }

  deleteInvoiceItem(invoiceItem: InvoiceItem): Observable<InvoiceItem> {
    this.state.remove$.next(this.http.delete<InvoiceItem>(`invoices/${invoiceItem.invoice_id}/items/${invoiceItem.id}`, httpOptions));
    return this.state.removeResponse$;
  }
}
