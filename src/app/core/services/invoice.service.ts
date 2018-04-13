import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

import { Invoice } from '../../invoices/invoice';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8'
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
  
  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>('invoices', invoice, httpOptions);
  }
  
  deleteInvoice(id: number): Observable<{}>  {
    return this.http.delete(`invoices/${id}`, httpOptions);
  }
}
