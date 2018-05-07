import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../interfaces/invoice';

@Injectable()
export class InvoicesResolverService implements Resolve<Invoice[]> {

  constructor(
    private invoiceService: InvoiceService
  ) {}

  resolve(): Observable<Invoice[]> {
    // return this.invoiceService.isData$
    //   .switchMap((isData) => {
    //     if (isData) {
    //       return this.invoiceService.invoices$;
    //     }
    //     return this.invoiceService.getInvoices();
    //   })
    //   .take(1);

    return this.invoiceService.getInvoices().take(1);
  }
}
