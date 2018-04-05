import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { ViewInvoiceRoutingModule } from './view-invoice-routing.module';
import { ViewInvoiceComponent } from './view-invoice.component';

@NgModule({
  imports: [
    SharedModule,
    ViewInvoiceRoutingModule
  ],
  declarations: [
    ViewInvoiceComponent
  ]
})
export class ViewInvoiceModule { }
