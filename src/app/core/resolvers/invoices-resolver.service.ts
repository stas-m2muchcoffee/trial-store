import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Invoice } from '../interfaces/invoice';

import { InvoiceService } from '../services/invoice.service';
import 'rxjs/add/operator/take';

@Injectable()
export class InvoicesResolverService implements Resolve<Invoice[]> {
  constructor(
    private invoiceService: InvoiceService
  ) {}
  resolve(): Observable<Invoice[]> {
    // if (this.invoiceService.invoices$) {
    //   return this.invoiceService.invoices$;
    // }
    return this.invoiceService.getInvoices()
      .take(1);
  }
}
