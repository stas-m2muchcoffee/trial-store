import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { InvoiceService } from '../../core/services/invoice.service';

@Injectable()
export class InvoicesResolverService implements Resolve<any> {

  constructor(
    private invoiceService: InvoiceService
  ) { }
  
  resolve() {
    this.invoiceService.getInvoices();
  }

}
