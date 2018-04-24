import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';

import { InvoiceItemModule } from '../invoice-item/invoice-item.module';

import { EditInvoiceRoutingModule } from './edit-invoice-routing.module';
import { EditInvoiceComponent } from './edit-invoice.component';

@NgModule({
  imports: [
    CommonModule,
    EditInvoiceRoutingModule,
    SharedModule,
    MatSelectModule,
    MatInputModule,
    InvoiceItemModule
  ],
  declarations: [
    EditInvoiceComponent
  ]
})
export class EditInvoiceModule { }
