import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { NewInvoiceComponent } from './new-invoice.component';
import { NewInvoiceRoutingModule } from './new-invoice-routing.module';

@NgModule({
  imports: [
    SharedModule,
    NewInvoiceRoutingModule,
    MatSelectModule,
    MatInputModule
  ],
  declarations: [
    NewInvoiceComponent
  ],
  exports: []
})
export class NewInvoiceModule { }
