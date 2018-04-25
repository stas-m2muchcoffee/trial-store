import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { InvoiceItem } from '../interfaces/invoice-item';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8'
  })
};

@Injectable()
export class InvoiceItemsService {
  invoiceItems$: Observable<InvoiceItem[]>;

  constructor(
    private http: HttpClient
  ) { }
  getInvoiceItems(id: number | string): Observable<InvoiceItem[]> {
    return this.invoiceItems$ = this.http.get<InvoiceItem[]>(`invoices/${id}/items`).publishLast().refCount();
  }
  createInvoiceItem(invoiceItem, invoiceId): Observable<InvoiceItem> {
    return this.http.post<InvoiceItem>(`invoices/${invoiceId}/items`, invoiceItem, httpOptions);
  }
  updateInvoiceItem(invoiceItem, InvoiceItemId, invoiceId): Observable<InvoiceItem> {
    return this.http.put<InvoiceItem>(`invoices/${invoiceId}/items/${InvoiceItemId}`, invoiceItem, httpOptions);
  }
  deleteInvoiceItem(InvoiceItemId, invoiceId): Observable<InvoiceItem> {
    return this.http.delete(`invoices/${invoiceId}/items/${InvoiceItemId}`, httpOptions)
      .catch(error => {
        console.log(error);
        return Observable.throw(error);
      });
  }
}
