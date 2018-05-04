import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { EditInvoiceComponent } from '../../invoices/edit-invoice/edit-invoice.component';

@Injectable()
export class CanDeactivateEditInvoiceGuard implements CanDeactivate<EditInvoiceComponent> {
  canDeactivate(component: EditInvoiceComponent): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
