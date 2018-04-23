import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishLast';

import { Invoice } from '../interfaces/invoice';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8'
  })
};

@Injectable()
export class InvoiceService {
  invoices$: Observable<Invoice[]>;
  invoice$: Observable<Invoice>;
  constructor(
    private http: HttpClient
  ) { }
  getInvoices(): Observable<Invoice[]> {
    return this.invoices$ = this.http.get<Invoice[]>('invoices').publishLast().refCount();
  }
  getInvoice(id: number | string): Observable<Invoice> {
    return this.invoice$ = this.http.get<Invoice>(`invoices/${id}`).publishLast().refCount();
  }
  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>('invoices', invoice, httpOptions);
  }
  deleteInvoice(id: number): Observable<{}> {
    return this.http.delete(`invoices/${id}`, httpOptions);
  }
  updateInvoice(invoice: Invoice, id: number | string): Observable<Invoice> {
    return this.http.put<Invoice>(`invoices/${id}`, invoice, httpOptions);
  }
}
