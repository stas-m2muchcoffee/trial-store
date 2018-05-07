import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/filter';

import { StateManagement } from '../../shared/state-management';

import { InvoiceItem } from '../interfaces/invoice-item';
import 'rxjs/add/operator/shareReplay';

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
    private http: HttpClient
  ) {
    this.state = new StateManagement<InvoiceItem>();

    this.invoiceItems$ = Observable.combineLatest(
      this.state.entities$,
      this.state.collectionIds$
    )
    .map(([entities, ids]: [{ [index: number]: InvoiceItem }, number[]]) =>
      ids.filter((id) => entities[id]).map((id) => entities[id])
    )
    .shareReplay(1);

    this.addedInvoiceItem$ = Observable.combineLatest(
      this.state.entities$,
      this.state.addEntityId$
    )
    .map(([entities, id]: [{ [index: number]: InvoiceItem }, number]) => entities[id]);

    this.updatedInvoiceItem$ = Observable.combineLatest(
      this.state.entities$,
      this.state.updateEntityId$
    )
    .map(([entities, id]: [{ [index: number]: InvoiceItem }, number]) => entities[id]);
  }

  getInvoiceItems(id: number | string): Observable<InvoiceItem[]> {
    this.state.getList$.next(this.http.get<InvoiceItem[]>(`invoices/${id}/items`));
    return this.invoiceItems$;
  }

  createInvoiceItem(invoiceItem): Observable<InvoiceItem> {
    this.state.add$.next(this.http.post<InvoiceItem>(`invoices/${invoiceItem.invoice_id}/items`, invoiceItem, httpOptions));
    return this.addedInvoiceItem$;
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
