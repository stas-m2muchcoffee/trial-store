import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../../shared/shared.module';

import { InvoiceItemModule } from '../invoice-item/invoice-item.module';

import { NewInvoiceComponent } from './new-invoice.component';
import { NewInvoiceRoutingModule } from './new-invoice-routing.module';
@NgModule({
  imports: [
    SharedModule,
    NewInvoiceRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    InvoiceItemModule
  ],
  declarations: [
    NewInvoiceComponent
  ],
})
export class NewInvoiceModule { }
