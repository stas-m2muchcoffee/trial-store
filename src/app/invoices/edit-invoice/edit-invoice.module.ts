import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditInvoiceRoutingModule } from './edit-invoice-routing.module';
import { EditInvoiceComponent } from './edit-invoice.component';

@NgModule({
  imports: [
    CommonModule,
    EditInvoiceRoutingModule
  ],
  declarations: [
    EditInvoiceComponent
  ]
})
export class EditInvoiceModule { }
