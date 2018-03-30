import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NewInvoiceComponent } from './new-invoice.component';
import { NewInvoiceRoutingModule } from './new-invoice-routing.module';

@NgModule({
  imports: [
    SharedModule,
    NewInvoiceRoutingModule
  ],
  declarations: [
    NewInvoiceComponent
  ],
  exports: []
})
export class NewInvoiceModule { }
