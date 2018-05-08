import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from '../../shared/shared.module';

import { InvoiceItemModule } from '../invoice-item/invoice-item.module';

import { InvoiceComponent } from './invoice.component';
import { InvoiceRoutingModule } from './invoice-routing.module';

@NgModule({
  imports: [
    SharedModule,
    InvoiceRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    InvoiceItemModule,
    MatDividerModule,
    MatListModule,
  ],
  declarations: [
    InvoiceComponent
  ],
})
export class InvoiceModule { }
