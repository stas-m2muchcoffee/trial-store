import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { InvoiceItemsService } from '../../core/services/invoice-items.service';

@Injectable()
export class InvoiceItemsResolverService implements Resolve<any> {

  constructor(
    private invoiceItemsService: InvoiceItemsService
  ) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this.invoiceItemsService.getInvoiceItems(id);
  }

}
