import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Invoice } from '../interfaces/invoice';
import { InvoiceService } from '../services/invoice.service';
import 'rxjs/add/operator/take';

@Injectable()
export class InvoiceResolverService implements Resolve<Invoice> {
  constructor(
    private invoiceService: InvoiceService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Invoice> {
    const id = route.paramMap.get('id');
    return this.invoiceService.getInvoice(id)
      .take(1);
  }
}
