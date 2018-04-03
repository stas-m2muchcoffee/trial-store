import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Invoice } from '../../invoices/invoice';

@Injectable()
export class InvoiceService {
  private invoicesUrl = 'http://api.invoice-app.2muchcoffee.com/api/invoices';
  private numInvoices = new Subject<any>();
  
  constructor(
    private http: HttpClient
  ) { }
  
  sendNumInvoices(numInvoices: number) {
    this.numInvoices.next({ num: numInvoices });
  }
  
  getNumInvoices(): Observable<any> {
    return this.numInvoices.asObservable();
  }
  
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoicesUrl);
  }
}
