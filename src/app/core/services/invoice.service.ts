import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Invoice } from '../../invoices/invoice';

@Injectable()
export class InvoiceService {
  
  invoices$: Observable<Invoice[]>;
  
  constructor(
    private http: HttpClient
  ) { }
  
  getInvoices(): void {
    this.invoices$ = this.http.get<Invoice[]>('invoices');
  }
}