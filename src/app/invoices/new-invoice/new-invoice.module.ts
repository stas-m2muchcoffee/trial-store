import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../../shared/shared.module';

import { NewInvoiceComponent } from './new-invoice.component';
import { NewInvoiceRoutingModule } from './new-invoice-routing.module';
import { ModalWindowNewInvoiceComponent } from './modal-window-new-invoice/modal-window-new-invoice.component';
import {InvoiceItemComponent} from '../invoice-item/invoice-item.component';

@NgModule({
  imports: [
    SharedModule,
    NewInvoiceRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  declarations: [
    NewInvoiceComponent,
    ModalWindowNewInvoiceComponent,
    InvoiceItemComponent
  ],
  entryComponents: [
    ModalWindowNewInvoiceComponent
  ]
})
export class NewInvoiceModule { }
