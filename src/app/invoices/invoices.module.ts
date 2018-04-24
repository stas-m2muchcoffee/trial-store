import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../shared/shared.module';

import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { ViewInvoiceModule } from './view-invoice/view-invoice.module';
import { EditInvoiceModule } from './edit-invoice/edit-invoice.module';

@NgModule({
  imports: [
    SharedModule,
    InvoicesRoutingModule,
    ViewInvoiceModule,
    EditInvoiceModule,
    MatDialogModule
  ],
  declarations: [
    InvoicesComponent
  ],
})
export class InvoicesModule { }
