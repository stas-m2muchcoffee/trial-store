import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '../shared/shared.module';
import { NewInvoiceComponent } from './new-invoice.component';
import { NewInvoiceRoutingModule } from './new-invoice-routing.module';

@NgModule({
  imports: [
    SharedModule,
    NewInvoiceRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    NewInvoiceComponent
  ],
  exports: []
})
export class NewInvoiceModule { }
