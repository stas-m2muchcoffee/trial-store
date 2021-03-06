import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMapTo';

import { InvoiceItemsService } from '../services/invoice-items.service';
import { InvoiceItem } from '../interfaces/invoice-item';

@Injectable()
export class InvoiceItemsResolverService implements Resolve<InvoiceItem[] | boolean> {

  constructor(
    private invoiceItemsService: InvoiceItemsService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<InvoiceItem[]> | boolean {
    const id = route.paramMap.get('id');
    if (id) {
      return this.invoiceItemsService.state.responseDataRequests$
      .switchMapTo(this.invoiceItemsService.getInvoiceItems(id))
      .take(1);
    }
    return false;
  }
}
