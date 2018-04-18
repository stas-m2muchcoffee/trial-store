import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NewInvoiceComponent } from '../../invoices/new-invoice/new-invoice.component';

@Injectable()
export class CanDeactivateNewInvoiceGuard implements CanDeactivate<NewInvoiceComponent> {
  canDeactivate(component: NewInvoiceComponent): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
