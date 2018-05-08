import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { InvoiceComponent } from '../../invoices/invoice/invoice.component';

@Injectable()
export class InvoiceGuard implements CanDeactivate<InvoiceComponent> {
  canDeactivate(component: InvoiceComponent): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
