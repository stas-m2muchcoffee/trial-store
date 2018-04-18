import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/zip';

import { InvoiceItem } from '../interfaces/invoice-item';
import { Product } from '../interfaces/product';
import { Invoice } from '../interfaces/invoice';
import { Customer } from '../interfaces/customer';

import { InvoiceService } from './invoice.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8'
  })
};

@Injectable()
export class InvoiceItemsService {
  invoiceItems$: Observable<InvoiceItem[]>;
  products$: Observable<Product[]>;
  invoice$: Observable<Invoice>;
  customer$: Observable<Customer>;

  constructor(
    private http: HttpClient,
    private invoiceService: InvoiceService
  ) { }
  getInvoiceItems(id: number | string): Observable<InvoiceItem[]> {
    this.invoice$ = this.invoiceService.getInvoice(id);
    return this.invoiceItems$ = this.http.get<InvoiceItem[]>(`invoices/${id}/items`);
  }
  createInvoiceItem(invoiceItem, invoiceId): Observable<any> {
    return this.http.post<any>(`invoices/${invoiceId}/items`, invoiceItem, httpOptions);
  }
}
