import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { InvoiceListComponent } from './invoice-list.component';
import { InvoiceListRoutingModule } from './invoice-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InvoiceListRoutingModule,
  ],
  declarations: [
    InvoiceListComponent,
  ]
})
export class InvoiceListModule { }
