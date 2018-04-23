import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { InvoiceItemsService } from '../services/invoice-items.service';
import { InvoiceItem } from '../interfaces/invoice-item';

@Injectable()
export class InvoiceItemsResolverService implements Resolve<InvoiceItem[]> {
  constructor(
    private invoiceItemsService: InvoiceItemsService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<InvoiceItem[]> {
    const id = route.paramMap.get('id');
    return this.invoiceItemsService.getInvoiceItems(id);
  }
}
