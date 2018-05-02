import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '../../shared/shared.module';

import { InvoiceItemComponent } from './invoice-item.component';

@NgModule({
  imports: [
    SharedModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [
    InvoiceItemComponent
  ],
  exports: [
    InvoiceItemComponent
  ]
})
export class InvoiceItemModule { }