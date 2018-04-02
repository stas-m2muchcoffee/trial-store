import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Invoice } from '../../invoices/invoice';

@Injectable()
export class InvoiceService {
  private invoicesUrl = 'http://api.invoice-app.2muchcoffee.com/api/invoices';
  
  constructor(
    private http: HttpClient
  ) { }
  
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoicesUrl);
  }
}
