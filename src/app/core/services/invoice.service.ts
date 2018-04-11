import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

import { Invoice } from '../../invoices/invoice';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class InvoiceService {
  
  invoices$: Observable<Invoice[]>;
  
  constructor(
    private http: HttpClient
  ) { }
  
  getInvoices(): void {
    this.invoices$ = this.http.get<Invoice[]>('invoices');
  }
  
  getInvoice(id: number | string): Observable<Invoice> {
    return this.http.get<Invoice>(`invoices/${id}`);
  }
  
  updateInvoice(invoice: Invoice) {
    //debugger;
    return this.http.put<Invoice>(`invoices/${invoice.id}`, invoice, httpOptions);
  }
}
