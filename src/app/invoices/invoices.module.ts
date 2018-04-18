import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../shared/shared.module';
import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { ViewInvoiceModule } from './view-invoice/view-invoice.module';
import { EditInvoiceModule } from './edit-invoice/edit-invoice.module';
import { ModalWindowComponent } from './modal-window/modal-window.component';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatButtonModule,
    InvoicesRoutingModule,
    ViewInvoiceModule,
    EditInvoiceModule,
    MatDialogModule
  ],
  declarations: [
    InvoicesComponent,
    ModalWindowComponent
  ],
  entryComponents: [
    ModalWindowComponent
  ]
})
export class InvoicesModule { }
