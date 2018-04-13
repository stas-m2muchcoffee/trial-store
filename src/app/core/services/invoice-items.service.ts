import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/zip';

import { InvoiceItem } from '../../invoices/invoice-item';
import { Product } from '../../products/product';
import { Invoice } from '../../invoices/invoice';
import { Customer } from '../../customers/customer';
import { ProductService } from './product.service';
import { InvoiceService } from './invoice.service';
import { CustomerService } from './customer.service';

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
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private customerService: CustomerService
  ) { }
  
  getInvoiceItems(id: number | string): void {
    this.invoiceItems$ = this.http.get<InvoiceItem[]>(`invoices/${id}/items`);
    this.products$ = this.invoiceItems$
    .switchMap(invoices => Observable.zip(...invoices.map(invoice => this.productService.getProduct(invoice.product_id))));
    this.invoice$ = this.invoiceService.getInvoice(id);
    this.customer$ = this.invoice$.switchMap(invoice => this.customerService.getCustomer(invoice.customer_id));
  }
  
  createInvoiceItem(invoiceItem, invoiceId): Observable<any> {
    return this.http.post<any>(`invoices/${invoiceId}/items`, invoiceItem, httpOptions);
  }
  
}
